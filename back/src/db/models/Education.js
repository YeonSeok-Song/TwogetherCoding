import { educationModel } from "../schemas/education";

class Education {
  static create = async ({ newEducation }) => {
    const createdNewEducation = await educationModel.create(newEducation);
    return createdNewEducation;
  }

  static findById = async ({ educationId }) => {
    const education = await educationModel.findOne({ id: educationId, active : true, });
    return education;
  }

  static findByUserId = async ({ userId, page, perPage }) => {
    const total = await educationModel.countDocuments({ userId });
    const totalPage = Math.ceil(total / perPage);
    const educations = await educationModel.find({ userId, active : true, }).sort({ createdAt: 1 }).skip(perPage * (page -1)).limit(perPage);
    return { totalPage, educations };
  }

  static update = async ({ educationId, toUpdate }) => {
    const filter = { id: educationId, active : true, };
    const option = { returnOriginal: false };
    const updatedEducation = await educationModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedEducation;
  }

  static deleteById = async ({ educationId }) => {
    const deleteResult = await educationModel.deleteOne({ id: educationId, active : true, });
    // returns: { "acknowledged" : true, "deletedCount" : 1 }
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }

  static withdrawByUserId = async ({ userId, delayTime }) => {
    try{
      const withdrawResult = await educationModel.updateMany(
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
      const recoveryResult = await educationModel.updateMany(
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

export { Education };