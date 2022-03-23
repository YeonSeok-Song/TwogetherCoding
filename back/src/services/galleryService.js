import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class galleryService {
  static addImage = async ({ userId, title, description, fromDate, toDate }) => {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newProject = { id, userId, title, description, fromDate, toDate };

    // db에 저장
    const createdNewProject = await Project.create({ newImage });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

  static getProject = async ({ projectId }) => {
    // project db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    const project = await Project.findById({ projectId });
    if (!project) {
      const errorMessage =
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return project;
  }

  static getProjectList = async({ userId, page, perPage }) => {
    // project db에서 해당 유저의 프로젝트 리스트를 가져옴
    const { totalPage, projects } = await Project.findByUserId({ userId, page, perPage });
    return { totalPage, projects };
  }

  static setProject = async ({ projectId, toUpdate }) => {
    // project db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    let project = await Project.findById({ projectId });
    if (!project) {
      const errorMessage =
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const updatedProject = await Project.update({ projectId, toUpdate });
    return updatedProject;
  }

  static async deleteProject({ projectId }) {
    // project db에 존재 여부 확인 & db에서 찾지 못한 경우, 에러 메시지 반환
    const isDataDeleted = await Project.deleteById({ projectId });
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }

  static async uploadImage({ userId, imageInfo }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    user = await User.upload({ userId, imageInfo })
    
    return user;
  }

}

export { galleryService };
