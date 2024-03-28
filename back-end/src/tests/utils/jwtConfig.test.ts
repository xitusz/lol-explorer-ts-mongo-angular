import { expect } from "chai";
import sinon from "sinon";
import jwt from "jsonwebtoken";
import { sign, verifyToken } from "../../utils/jwtConfig";

describe("JWT Util", () => {
  const payload = { id: 1, name: "user", email: "user@example.com" };

  afterEach(() => {
    sinon.restore();
  });

  describe("sign", () => {
    it("should sign a token", () => {
      const signStub = sinon.stub(jwt, "sign").callsFake(() => "token");

      const token = sign(payload);

      expect(signStub.calledWith(payload, sinon.match.any, sinon.match.any)).to
        .be.true;
      expect(token).to.equal("token");
    });

    it("should handle error sign token", () => {
      sinon.stub(jwt, "sign").throws(new Error());

      try {
        sign(payload);
      } catch (err: any) {
        expect(err.message).to.equal(`Erro ao assinar o token JWT: Error`);
      }
    });
  });

  describe("verifyToken", () => {
    it("should verify a token", () => {
      const verifyStub = sinon.stub(jwt, "verify").callsFake(() => payload);

      const token = sign(payload);
      const decoded = verifyToken(token);

      expect(verifyStub.calledWith(token, sinon.match.any)).to.be.true;
      expect(decoded).to.deep.equal(payload);
    });

    it("should handle error verify token", () => {
      sinon.stub(jwt, "verify").rejects(new Error());

      try {
        verifyToken("token");
      } catch (err: any) {
        expect(err.message).to.equal(`Erro ao verificar o token JWT: Error`);
      }
    });
  });
});
