import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from '../services/awardService';

const awardRouter = Router();

awardRouter.get("/awardlist/:userId", login_required, async (req, res, next) => {
    try {

        if (is.emptyObject(req.query)) {
            throw new Error(
                "페이지네이션을 위한 쿼리를 확인해주세요."
            );
        }

        const page = Number(req.query.page) || 1;
        const perPage = Number(req.query.perPage) || 3;

        const getAwards = {
            userId : req.params.userId,
            page : page,
            perPage : perPage,
        }


        const award = await awardService.getAwards({ getAwards });

        if (award.errorMessage) {
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})
awardRouter.get("/awards/:id", login_required, async (req, res, next) => {
    try {

        if (is.emptyObject(req.params)) {
            throw new Error(
                "award id가 없습니다. 다시 확인해주세요."
            );
        }

        const getAward = {
            id : req.params.id,
        }

        const award = await awardService.getAward({ getAward });

        if (award.errorMessage) {
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})
awardRouter.post("/award/create", login_required, async (req, res, next) => {
    try {

        if (is.emptyObject(req.body) || !req.body.userId || !req.body.award || !req.body.description) {
            throw new Error(
                "데이터 생성에 필요한 정보가 없습니다. Body안의 데이터를 확인해주세요."
            );
        }

        const newAward = {
            userId : req.body.userId,
            award : req.body.award,
            description : req.body.description,
        }

        const award = await awardService.addAward({ newAward });

        if (award.errorMessage) {
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})

awardRouter.delete("/awards/:id", login_required, async (req, res, next) => {
    try {

        if (is.emptyObject(req.params)) {
            throw new Error(
                "award id가 없습니다. 다시 확인해주세요."
            );
        }

        const userId = req.currentUserId;
        const deleteAward = {
            userId : userId,
            id : req.params.id,
        }

        const award = await awardService.deleteAward({ deleteAward });

        if (award.errorMessage) {
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})

awardRouter.post("/award/:id", login_required, async (req, res, next) => {
    try {
        if (is.emptyObject(req.params) || is.emptyObject(req.body)) {
            throw new Error(
                "awardID 혹은 Body안의 정보가 없습니다. 다시 확인해주세요."
            );
        }

        const updateAward = {
            id : req.params.id,
            changeAward : req.body.changeAward,
            changeDescription : req.body.changeDescription
        }

        const award = await awardService.updateAward({ updateAward });

        if (award.errorMessage) {
            throw new Error(award.errorMessage);
        }

        res.status(200).send(award);

    } catch (error) {
        next(error);
    }
})

export { awardRouter };
