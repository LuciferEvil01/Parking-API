"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({ error: 'Unauthorized' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ error: 'Forbidden' });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=roleMiddleware.js.map