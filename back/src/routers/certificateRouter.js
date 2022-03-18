import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from '../services/certificateService';

const certificateRouter = Router();

certificateRouter.post("/certificate/create", login_required, async (req, res, next) => {
    try {
        const newCertificate = {
            user_id : req.body.user_id,
            title : req.body.title,
            description : req.body.description,
            date : req.body.date
        }

        const certificate = await certificateService.addCertificate({ newCertificate });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);


    } catch (errer) {
        next (errer);
    }
});

certificateRouter.get("/certificatelist/:user_id", login_required, async (req, res, next) => {
    try {
        
        const page = Number(req.query.page || 1);
        const perPage = Number(req.query.perPage || 3);

        const getCertificates = {
            user_id : req.params.user_id,
            page : page,
            perPage : perPage,
        }
        console.log(getCertificates);
        const certificate = await certificateService.getCertificates({ getCertificates });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);

    } catch (error) {
        next (error);
    }   
});

certificateRouter.get("/certificate/:id", login_required, async (req, res, next) => {
    try {
        
        const getCertificate = {
            id : req.params.id,
        }
        console.log(getCertificate);
        const certificate = await certificateService.getCertificate({ getCertificate });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);

    } catch (error) {
        next (error);
    }   
});

certificateRouter.post("/certificate/:id", login_required, async (req, res, next) => {
    try {

        const updateCertificate = {
            id : req.params.id,
            title : req.body.title,
            description : req.body.description,
            date : req.body.date
        }

        const certificate = await certificateService.updateCertificate({ updateCertificate });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);

    } catch (error) {
        next (error);
    }   
});

certificateRouter.delete("/certificate/:id", login_required, async (req, res, next) => {
    try {
        
        const deleteCertificate = {
            id : req.params.id,
            user_id : req.currentUserId,
        }
        console.log(deleteCertificate);
        
        const certificate = await certificateService.deleteCertificate({ deleteCertificate });

        if (certificate.errorMessage) {
            console.log(certificate.errorMessage);
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);
        

    } catch (error) {
        next (error);
    }   
});

export { certificateRouter };