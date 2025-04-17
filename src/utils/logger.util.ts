// Author: Andgel.B | Date: 2025-04-15 | File: logger.tool.ts

/* ===== Required modules ===== */
import dayjs from 'dayjs';
import chalk from 'chalk';

/**
 * Define the available log levels in the application.
 */
export type LogLevel = 'verbose' | 'debug' | 'log' | 'warn' | 'error' | 'fatal';

/**
 * Logger class for managing and formatting log messages with different levels of severity.
 */
export class Logger {
  private static minLogLevel: LogLevel = 'verbose';

  private static logLevels: { [key in LogLevel]: number } = {
    'fatal': 0,
    'error': 1,
    'warn': 2,
    'log': 3,
    'debug': 4,
    'verbose': 5,
  };

  private static maxLevelLength = Math.max(
    ...Object.keys(Logger.logLevels).map(level => level.length)
  );

  // Check the environment variable to enable/disable debug logs
  private static isDebugEnabled: boolean = process.env.DEV_DEBUG_LOGS === 'true';

  constructor(private readonly context: string) {
    this.verbose(`Logger initialized with context: ${context}`);
  }

  public verbose(message: unknown, context?: string): void {
    this.logMessage('verbose', message, context, chalk.cyanBright);
  }

  public debug(message: unknown, context?: string): void {
    if (!Logger.isDebugEnabled) return;
    this.logMessage('debug', message, context, chalk.magenta);
  }

  public log(message: unknown, context?: string): void {
    this.logMessage('log', message, context, chalk.greenBright);
  }

  public warn(message: unknown, context?: string): void {
    this.logMessage('warn', message, context, chalk.yellow);
  }

  public error(message: unknown, context?: string): void {
    this.logMessage('error', message, context, chalk.red);
  }

  public fatal(message: unknown, context?: string): void {
    this.logMessage('fatal', message, context, chalk.bgRed.white);
  }

  /**
   * Generic method to handle log messages.
   */
  private logMessage(level: LogLevel, message: unknown, context: string | undefined, colorFn: chalk.Chalk): void {
    if (Logger.logLevels[level] > Logger.logLevels[Logger.minLogLevel]) {
      return;
    }

    const timestamp = dayjs().toString();
    const levelPadded = level.toUpperCase().padStart(Logger.maxLevelLength, ' ');
    const resolvedContext = context || this.context;

    let formattedMessage: string;
    try {
      formattedMessage = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
    } catch {
      formattedMessage = '[Unserializable object: Unable to display content]';
    }

    const logMessage = `[${timestamp}] ${levelPadded} ${chalk.yellow(`[${resolvedContext}]`)} ${formattedMessage}`;
    console.log(colorFn(logMessage));
  }
}
