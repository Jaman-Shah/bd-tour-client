import React from "react";
import SectionHeader from "../../components/shared/SectionHeader";
import useGetGuides from "../../hooks/useGetGuides";
import { Link } from "react-router-dom";

const TourGuideSection = () => {
  const { guides } = useGetGuides();

  return (
    <div>
      <SectionHeader title="Our Tour Guides" />
      <div class="container mx-auto">
        <div class="overflow-x-auto overflow-y-auto">
          <table class="min-w-full bg-white rounded-lg shadow-md">
            <thead class="bg-blue-500 text-white">
              <tr>
                <th class="py-3 px-4 text-left">Image</th>
                <th class="py-3 px-4 text-left">Name</th>
                <th class="py-3 px-4 text-left">Email</th>
                <th class="py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {guides &&
                guides.map((guide, index) => {
                  return (
                    <tr
                      key={guide._id}
                      class={`border-b border-gray-200 ${
                        index % 2 === 0 ? "bg-gray-300" : "bg-blue-600"
                      }`}
                    >
                      <td class="py-3 px-4">
                        <div
                          className="bg-cover bg-center h-12 w-12 rounded-2xl"
                          style={{ backgroundImage: `url(${guide.photo_url})` }}
                        ></div>
                      </td>
                      <td class="py-3 px-4">{guide.name}</td>
                      <td class="py-3 px-4">{guide.email}</td>
                      <td class="py-3 px-4">
                        <Link
                          to={`/guide/${guide._id}`}
                          className="border p-2 border-black"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TourGuideSection;
