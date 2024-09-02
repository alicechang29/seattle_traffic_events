import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import { NotFoundError } from "./expressError.ts";
import type { IExpressError } from "./expressError.ts";
import trafficEvents from "./routes/trafficEvents.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/events", trafficEvents);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  throw new NotFoundError();
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err: IExpressError, req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;