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
 * This class allows logging information, warnings, errors, and debug messages
 * with color-coded output for better readability in the console.
 */
/**
 * Logger class for managing and formatting log messages with different levels of severity.
 * The log levels include 'fatal', 'error', 'warn', 'log', 'debug', and 'verbose'.
 * The minimum log level can be configured via the environment variable `LOG_LEVEL`.
 * 
 * Log messages are color-coded for better readability in the console.
 * 
 * @example
 * const logger = new Logger('MyService');
 * logger.log('This is a general log message.');
 * logger.error('An error occurred.', { errorCode: 500 });
 * logger.debug('Debugging details here.');
 */
export class Logger {
  // Default log level. It can be overridden via the environment variable LOG_LEVEL.
  private static minLogLevel: LogLevel = 'verbose';

  /**
   * Define the order of log levels. Levels with higher index values will be logged.
   */
  private static logLevels: { [key in LogLevel]: number } = {
    'fatal': 0,   // Fatal errors, highest priority
    'error': 1,   // Errors
    'warn': 2,    // Warnings
    'log': 3,     // General logs
    'debug': 4,   // Debug messages
    'verbose': 5, // Detailed messages, lowest priority
  };

  /**
   * @param context - The context in which the logger is used (e.g., service or module name).
   */
  constructor( private readonly context: string ) {
    this.verbose( `Logger initialized with context: ${context}` );
  }

  /**
   * Find the length of the longest log level.
   */
  private static maxLevelLength = Math.max(
    ...Object.keys( Logger.logLevels ).map( level => {return level.length;} )
  );

  /**
   * Write the log message to the console with the appropriate color based on the log level.
   * @param level - The log level (log, error, warn, debug, verbose, fatal).
   * @param message - The message to log.
   * @param context - Optional context to provide additional information about the log origin.
   */
  private static writeLog( level: LogLevel, message: string, context?: string ) {

    const timestamp = dayjs().toString();
    const levelPadded = level.toUpperCase().padStart( Logger.maxLevelLength, ' ' );

    const logMessage = `[${timestamp}] ${levelPadded} ${context ? chalk.yellow( `[${context}]` ) : ''} ${message}`;

    switch ( level ) {
    case 'fatal':
      console.log( chalk.bgRed.white( logMessage ) );
      break;
    case 'error':
      console.log( chalk.red( logMessage ) );
      break;
    case 'warn':
      console.log( chalk.yellow( logMessage ) );
      break;
    case 'log':
      console.log( chalk.greenBright( logMessage ) );
      break;
    case 'debug':
      console.log( chalk.magenta( logMessage ) );
      break;
    case 'verbose':
      console.log( chalk.cyanBright( logMessage ) );
      break;
    default:
      console.log( logMessage );
    }
  }

  /**
   * Log a general message.
   * @param message - The message to log.
   */
  log( message: string, ...params: unknown[] ) {
    Logger.writeLog( 'log', `${message} ${params.length ? JSON.stringify( params ) : ''}`, this.context );
  }

  /**
   * Log an error message, with the option to include a stack trace or additional parameters.
   * @param message - The error message to log.
   * @param params - List of parameters to include in the log, similar to console.log.
   */
  error( message: string, ...params: unknown[] ) {
    Logger.writeLog( 'error', `${message} ${params.length ? JSON.stringify( params ) : ''}`, this.context );
  }

  /**
   * Log a warning message.
   * @param message - The warning message to log.
   */
  warn( message: string, ...params: unknown[] ) {
    Logger.writeLog( 'warn', `${message} ${params.length ? JSON.stringify( params ) : ''}`, this.context );
  }

  /**
   * Log a debug message.
   * @param message - The debug message to log.
   */
  debug( message: string, ...params: unknown[] ) {
    Logger.writeLog( 'debug', `${message} ${params.length ? JSON.stringify( params ) : ''}`, this.context );
  }

  /**
   * Log a detailed message, typically for very verbose output.
   * @param message - The detailed message to log.
   */
  verbose( message: string, ...params: unknown[] ) {
    Logger.writeLog( 'verbose', `${message} ${params.length ? JSON.stringify( params ) : ''}`, this.context );
  }

  /**
   * Log a fatal message, usually for critical errors that cause the application to stop.
   * @param message - The fatal message to log.
   * @param params - List of parameters to include in the log, similar to console.log.
   */
  fatal( message: string, ...params: unknown[] ) {
    Logger.writeLog( 'fatal', `${message} ${params.length ? JSON.stringify( params ) : ''}`, this.context );
  }
}
