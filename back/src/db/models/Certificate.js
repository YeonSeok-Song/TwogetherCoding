import { CertificateModel } from "../schemas/certificate";

class Certificate {

    static create = async ({ newCertificate }) => {
        const checkAlreadyExist = await CertificateModel.findOne({
            userId : newCertificate.userId,
            title : newCertificate.title,
            active : true,
        });
        if (checkAlreadyExist) {
            return checkAlreadyExist;
        }
        const createdNewCertificate = await CertificateModel.create(newCertificate);
        return createdNewCertificate;
    }

    static delete = async ({ deleteCertificate }) => {
        const deleteCertificateResult = await CertificateModel.deleteOne({ 
            id : deleteCertificate.id,
            userId : deleteCertificate.userId,
            active : true,
        });
        return deleteCertificateResult;

    }

    static findAllToUser = async ({ getCertificates }) => {

        const total = await CertificateModel.countDocuments({ 
            userId : getCertificates.userId,
        });

        const limit = getCertificates.perPage;
        const offset = (getCertificates.page - 1) * limit;

        const certificates = await CertificateModel.find({ 
            userId : getCertificates.userId,
            active : true,
        }).limit(limit).skip(offset);

        const newCertificates = { 
            "total" : total,
            certificates : certificates
        }

        return newCertificates;
    }

    static findOne = async ({ getCertificate }) => {
        const certificate = await CertificateModel.findOne({
            id : getCertificate.id,
            active : true,
        })
        return certificate;
    }

    static update = async ({ updateCertificate }) =>{
        const filter = { 
            id : updateCertificate.id ,
            active : true,
        };
        const update = {
            title : updateCertificate.title,
            description : updateCertificate.description,
            date : updateCertificate.date,
        };
        const option = { returnOriginal: false };

        const updateCertificateResult = await CertificateModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updateCertificateResult;
    }

    static withdrawByUserId = async ({ userId, delayTime }) => {
        try {
            const withdrawResult = await CertificateModel.updateMany(
                { userId : userId, active : true, },
                { $set : { expiredAt : delayTime, active : false } },
                { returnOriginal : false },
              )
          
            return withdrawResult;
        } catch (err) {
            return { error : err.message };
        }
    }

    static recoveryByUserId = async ({ userId }) => {
        try {
            const recoveryResult = await CertificateModel.updateMany(
                { userId : userId, active : false, },
                { $set : { active : true }, $unset : { expiredAt : true } },
                { returnOriginal : false },
              )
          
            return recoveryResult;
        } catch (err) {
            return { error : err.message };
        }
    }
}

export { Certificate };
