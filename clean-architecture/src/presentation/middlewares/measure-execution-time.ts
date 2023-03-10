import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { performance } from 'perf_hooks';

function writeTimeExecution(time: number, output: string) {
  if (time <= 0) return;
  fs.appendFileSync(output, `${time.toString()}\n`);
}

export function measureExecutionTime(output: string) {
  return function (request: Request, response: Response, next: NextFunction) {
    const start = performance.now();

    next();

    const end = performance.now();

    const result = end - start;

    writeTimeExecution(result, output);
  };
}
