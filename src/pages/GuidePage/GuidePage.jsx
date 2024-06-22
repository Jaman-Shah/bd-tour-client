import React from "react";
import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import GuideReview from "./GuideReview";

const GuidePage = () => {
  const { id } = useParams();

  const axiosCommon = useAxiosCommon();
  const {
    data: guide = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["guide"],
    queryFn: async () => {
      const response = await axiosCommon(`/guides/${id}`);
      return response.data;
    },
  });


  const {
    _id,
    name,
    email,
    phone,
    photo_url,
    educations,
    experiences,
    skills,
  } = guide;

  return (
    <>
      <div className="flex flex-col md:flex-row border-2 rounded-xl shadow-2xl items-center p-4 md:p-24 gap-2">
        <div className="w-full md:w-1/3 md:border-r-[20px] border-blue-500 p-0 md:p-4 flex items-center justify-center ">
          <div
            className="bg-cover bg-center shadow2xl  text-center h-60 md:h-52 w-64 md:w-52  rounded-2xl"
            style={{ backgroundImage: `url(${photo_url})` }}
          ></div>
        </div>
        <div className="w-full md:w-2/3 p-0 md:p-4">
          <div className="border p-4 rounded-3xl">
            <h1 className="font-thin text-[50px]">{name}</h1>
            <p className="font-bold text-2xl">{email}</p>

            <div>
              <h1 className="font-bold border-b">Educations</h1>
              {educations &&
                educations.map((education, index) => {
                  return (
                    <div key={index}>
                      <p>{education.title}</p>
                      <p>{education.details}</p>
                    </div>
                  );
                })}
            </div>
            <div>
              <h1 className="font-bold border-b">Skills</h1>
              {skills &&
                skills.map((skill, index) => {
                  return (
                    <div key={index}>
                      <p>{skill.title}</p>
                      <p>{skill.details}</p>
                    </div>
                  );
                })}
            </div>
            <div>
              <h1 className="font-bold border-b">Experiences</h1>
              {experiences &&
                experiences.map((experience, index) => {
                  return (
                    <div key={index}>
                      <p>{experience.title}</p>
                      <p>{experience.details}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <GuideReview guideEmail={email} />
    </>
  );
};

export default GuidePage;
