import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as StackTrace from 'stacktrace-js';
import * as Path from 'path';

import { Injectable, Logger as BaseLogger, Scope } from '@nestjs/common';
import { RequestContext } from './request-context.service';

/**
 * https://docs.nestjs.com/techniques/logger
 */
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends BaseLogger {
  logger: any;
  constructor(private req: RequestContext, context?: string) {
    super(context);
    this.logger = this.winstonLogger();
  }

  private winstonLogger() {
    const transports = [];
    const formatCombine = winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(
        ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`,
      ),
    );
    if (process.env.NODE_ENV === 'local') {
      transports.push(
        new winston.transports.Console({
          format: formatCombine,
        }),
      );
    } else {
      transports.push(
        new winston.transports.File({
          filename: `/var/log/bff_info.log`, // server log folder
          level: 'info',
          maxsize: 31457280,
          maxFiles: 10,
          tailable: true,
          format: formatCombine,
        }),
        new winston.transports.File({
          filename: `/var/log/bff_debug.log`,
          level: 'debug',
          maxsize: 31457280,
          maxFiles: 10,
          tailable: true,
          format: formatCombine,
        }),
      );
    }

    return WinstonModule.createLogger({ transports });
  }

  /**
   * inspect debug log content for logging
   * @param {array} content debug log content array
   * @returns {string}
   */
  private inspectBodys(content: any): string {
    let result = '';
    for (const preContent of content) {
      if (typeof preContent === 'string') {
        result += preContent;
      } else if (preContent instanceof Error && preContent.stack) {
        result += preContent.stack;
      } else {
        result += JSON.stringify(preContent);
      }
      result += '';
    }
    return result;
  }

  /**
   * replace sensetive string
   * @param {string} content
   * @param {string} removeReplacement
   */
  private replaceSensetiveString(content, removeReplacement): string {
    const specials = [' ', '`', "'", '"', '\\'];
    const regex = RegExp('[' + specials.join('\\') + ']', 'g');
    const escapeRegExp = function (str) {
      return str.replace(regex, '\\$&');
    };

    const r = {
      bdq: ' *("(\\.|[^"])*")', //     \ *(\'(\\.|[^\'])*\
      bsq: " *('(\\.|[^'])*')", //     \ *(\"(\\.|[^\"])*\
    };

    const s =
      '`PASSWORD`=' +
      r.bsq +
      '|' +
      '`ENCRYPTED_PASSWORD`=' +
      r.bsq +
      '|' +
      '"encrypted_password":' +
      r.bdq +
      '|' +
      '"adminPassword":' +
      r.bdq +
      '|' +
      '"plaintext":' +
      r.bdq +
      '|' +
      '"ciphertext":' +
      r.bdq +
      '|' +
      '"password":' +
      r.bdq +
      '|' +
      '"base64_key":' +
      r.bdq +
      '|' +
      '"BASE64KEY":' +
      r.bdq +
      '';

    const re = new RegExp(escapeRegExp(s), 'gi');
    return content.replace(re, removeReplacement);
  }

  private getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = Path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }

  /**
   * return the formatted debug log content
   * @param {string} [traceId] trace id for a series request
   * @param {string} [companyGuid] company guid
   * @param {string} [logFunction] function name the debug log located
   * @param {array} [bodys] the debug log content
   * @param {string} [removeReplacement] sensitive content want to repalced
   * @returns {string}
   */
  private parseLogString(
    traceId: string,
    companyGuid: string,
    bodys: any,
    removeReplacement = null,
  ): string {
    traceId = traceId || '';
    companyGuid = companyGuid || '';
    removeReplacement = removeReplacement;

    let logString = '';
    let logLocation = '';

    try {
      logString = this.inspectBodys(bodys);

      logLocation = this.getStackTrace(4);

      logString = this.replaceSensetiveString(logString, removeReplacement);

      logString = logString.replace(/\n/g, ' '); // replace the line breaks otherwise the debug log send to splunk will break lines
    } catch (error) {
      logString = 'parseLogString exception: ' + error;
    }

    let result: string;
    result = `(${logLocation})`;
    if (traceId) result += ` [${traceId}] `;
    if (companyGuid) result += `[${companyGuid}] `;
    if (logString) result += `${logString}`;

    if (result.length > 16384) {
      result = result.substring(0, 16384);
    }

    return result;
  }

  private get traceId(): string {
    return this.req?.context?.headers?.['x-request-id'] || '';
  }

  /**
   * debug log
   * @param {string} [traceId] a random string for trace log
   * @param {string} [logFunction] the function of the log located
   * @param {string} [companyGuid] a uuid for a specifc company
   * @param {array} [bodys] log content
   */
  debug(message: unknown): void {
    const content = this.parseLogString(this.traceId, null, message, null);

    this.logger.debug(content);
  }

  /**
   * info log
   * @param {string} [traceId] a random string for trace log
   * @param {string} [companyGuid] a uuid for a specifc company
   * @param {array} [bodys] log content
   */
  log(message: unknown): void {
    const content = this.parseLogString(this.traceId, null, message, null);

    this.logger.log(content);
  }

  /**
   * error log
   * @param {string} [traceId] a random string for trace log
   * @param {string} [companyGuid] a uuid for a specifc company
   * @param {array} [bodys] log content
   */
  error(message: unknown, trace?: string): void {
    const content = this.parseLogString(this.traceId, null, message, null);

    this.logger.error(`${content} trace: ${trace}`);
  }

  /**
   * warning log
   * @param {string} [traceId] a random string for trace log
   * @param {string} [companyGuid] a uuid for a specifc company
   * @param {array} [bodys] log content
   */
  warn(message: unknown): void {
    const content = this.parseLogString(this.traceId, null, message, null);

    this.logger.warn(content);
  }
}
