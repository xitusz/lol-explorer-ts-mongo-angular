import { expect } from "chai";
import { Request, Response } from "express";
import sinon, { SinonStub } from "sinon";
import errorMiddleware from "../../middlewares/errorMiddleware";

describe("Error Middleware", () => {
  it("should handle error", () => {
    const err = {
      statusCode: 404,
      message: "Not Found",
    };
    const req: Request = {} as Request;
    const res: Response = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    } as unknown as Response;
    const next = sinon.spy();

    errorMiddleware(err, req, res, next);

    expect((res.status as SinonStub).calledWith(404)).to.be.true;
    expect((res.json as SinonStub).args[0][0]).to.deep.equal({
      message: "Not Found",
    });
    expect(next.notCalled).to.be.true;
  });
});
