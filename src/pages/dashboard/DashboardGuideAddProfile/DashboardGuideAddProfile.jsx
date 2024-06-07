import React, { useState } from "react";
import useUser from "../../../hooks/useUser";
import SectionHeader from "../../../components/shared/SectionHeader";
import AddGuideProfileModal from "../../../components/shared/AddGuideProfileModal";
import { photoUpload } from "../../../api/utils/photoUpload";
import { auth } from "../../../firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import ActionLoader from "./../../../components/shared/ActionLoader";

const DashboardGuideAddProfile = () => {
  const { currentUser, refetch } = useUser();

  const axiosSecure = useAxiosSecure();

  // individual modals state for opening and closing
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [educationsModalOpen, setEducationsModalOpen] = useState(false);
  const [experiencesModalOpen, setExperiencesModalOpen] = useState(false);

  const [photoUrl, setPhotoUrl] = useState(currentUser.photo_url);
  const [photoUploadLoading, setPhotoUploadLoading] = useState(false);

  // individual modals data

  const [skills, setSkills] = useState(currentUser.skills || []);
  const [educations, setEducations] = useState(currentUser.educations || []);
  const [experiences, setExperiences] = useState(currentUser.experiences || []);

  const handleCreateProfile = async (e) => {
    e.preventDefault();

    if (skills.length < 1 || educations.length < 1 || experiences.length < 1) {
      return toast.error("Add At least one Skills and Edu and Exp");
    }

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.files[0];
    const phone = form.phone_number.value;

    try {
      setPhotoUploadLoading(true);
      const uploadedPhotoUrl = await photoUpload(photo);
      setPhotoUrl(uploadedPhotoUrl);
      setPhotoUploadLoading(false);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: uploadedPhotoUrl,
      });

      const response = await axiosSecure.put("/users", {
        name,
        email,
        photo_url: uploadedPhotoUrl || currentUser.photo_url,
        phone,
        skills,
        educations,
        experiences,
      });
      toast.success("Profile Update Success");
      refetch();
    } catch (error) {
      console.error("Error creating profile:", error.message);
      toast.error("Failed to create profile");
    }
  };
  return (
    <div>
      <SectionHeader title="Add Your Profile" />
      <div className="flex gap-2">
        <button
          onClick={() => setSkillsModalOpen(true)}
          className="border border-black p-4 w-full"
        >
          Add Skills {skills.length > 0 && `(${skills.length})`}
        </button>
        <button
          onClick={() => setEducationsModalOpen(true)}
          className="border border-black p-4 w-full"
        >
          Add Educations{educations.length > 0 && `(${educations.length})`}
        </button>
        <button
          onClick={() => setExperiencesModalOpen(true)}
          className="border border-black p-4 w-full"
        >
          Add Experience {experiences.length > 0 && `(${experiences.length})`}
        </button>
      </div>
      <form
        onSubmit={handleCreateProfile}
        className="grid gap-2
       grid-cols-2 lg:grid-cols-3"
      >
        <div>
          <p>Your Name</p>
          <input
            defaultValue={currentUser.name}
            type="text"
            placeholder="Tour Title"
            name="name"
            className="h-16 w-full border-2 border-black p-2 rounded-xl"
            required
          />
        </div>
        <div>
          <p>Your email</p>
          <input
            value={currentUser.email}
            type="email"
            name="email"
            className="h-16 w-full border-2 border-black p-2 rounded-xl"
            required
            disabled
          />
        </div>
        <div>
          <p>Change Photo</p>
          <div className="h-16 relative w-full border-2 border-black p-2 rounded-xl">
            <input type="file" className="" name="photo" />
            {photoUploadLoading && <ActionLoader />}
            <img
              src={photoUrl}
              alt=""
              className="h-12 w-12 absolute  top-1 right-1 rounded-full"
            />
          </div>
        </div>
        <div>
          <p>Add Phone</p>
          <input
            type="number"
            defaultValue={currentUser.phone || ""}
            placeholder="Your Phone Number"
            name="phone_number"
            className="h-16 w-full border-2 border-black p-2 rounded-xl"
            required
          />
        </div>
        <button type="submit" className="border-2 mt-4 border-green-500 p-4">
          ADD PROFILE
        </button>
      </form>
      <div>
        <AddGuideProfileModal
          data={skills}
          setData={setSkills}
          heading="Skills"
          isModalOpen={skillsModalOpen}
          setIsModalOpen={setSkillsModalOpen}
        />
        <AddGuideProfileModal
          data={educations}
          setData={setEducations}
          heading="Educations"
          isModalOpen={educationsModalOpen}
          setIsModalOpen={setEducationsModalOpen}
        />
        <AddGuideProfileModal
          data={experiences}
          setData={setExperiences}
          heading="Experiences"
          isModalOpen={experiencesModalOpen}
          setIsModalOpen={setExperiencesModalOpen}
        />
      </div>
    </div>
  );
};

export default DashboardGuideAddProfile;
