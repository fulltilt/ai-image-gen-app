const baseUrl = "http://192.168.1.11:1337/api"; // Strapi api
const headers = {
  Authorization: `Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`,
  "Content-Type": "application/json",
};

type User = {
  userEmail: string;
  userName: string;
};

const GetUserInfo = async (email: string) => {
  const res = await fetch(
    `${baseUrl}/user-lists?filters[userEmail][$eq]=${email}`,
    {
      method: "GET",
      headers,
    }
  );
  return await res.json();
};

const CreateNewUser = async (data: User) => {
  const response = await fetch(`${baseUrl}/user-lists`, {
    method: "POST",
    headers,
    body: JSON.stringify({ data }),
  });

  return await response.json();
};

const GetFeaturedCategoryList = async () => {
  const response = await fetch(
    `${baseUrl}/ai-models?filters[isFeatured][$eq]=true&populate=*`,
    {
      method: "GET",
      headers,
    }
  );

  return await response.json();
};

const GetAiModels = async (type: string) => {
  const response = await fetch(
    `${baseUrl}/ai-models?filters[${type}][$eq]=true&populate=*`,
    {
      method: "GET",
      headers,
    }
  );

  return await response.json();
};

const AIGenerateImage = async (data) => {
  const response = await fetch(`http://192.168.1.11:8081/aimodel`, {
    method: "POST",
    headers,
    body: JSON.stringify({ data }),
  });

  return await response.json();
};

const UpdateUserCredits = async (
  documentId: string,
  data: {
    credits: number;
  }
) => {
  const response = await fetch(`${baseUrl}/user-lists/${documentId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
  });

  return await response.json();
};

const AddAiImageRecord = async (data) => {
  const response = await fetch(`${baseUrl}/ai-generated-images`, {
    method: "POST",
    headers,
    body: JSON.stringify({ data }),
  });

  return await response.json();
};

const GetAllAiImages = async (currentPage: number, pageSize: number) => {
  const res = await fetch(
    `${baseUrl}/ai-generated-images?pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`,
    {
      method: "GET",
      headers,
    }
  );
  const data = await res.json();
  return data;
};

export default {
  GetUserInfo,
  CreateNewUser,
  GetFeaturedCategoryList,
  GetAiModels,
  AIGenerateImage,
  UpdateUserCredits,
  AddAiImageRecord,
  GetAllAiImages,
};
