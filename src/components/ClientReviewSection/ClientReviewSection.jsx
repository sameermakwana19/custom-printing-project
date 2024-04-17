import React from "react";
import ClientReviewCard from "./ClientReviewCard/ClientReviewCard";
import user1 from "../../assets/user1.jpg";
import user2 from "../../assets/user2.png";
import user3 from "../../assets/user3.png";
import Heading from "../ui/Heading/Heading";
import DividerLine from "../ui/DividerLine/DividerLine";

const ClientReviewArray = [
  {
    id: crypto.randomUUID(),
    rating: 3,
    avatar: user1,
    reviewText:
      "Lectus, nonummy et. Occaecat delectus erat, minima dapibus ornare nunc, autem.",
    name: "Diana Burnwood",
  },
  {
    id: crypto.randomUUID(),
    rating: 4,
    avatar: user2,
    reviewText:
      "Lectus, nonummy et. Occaecat delectus erat, minima dapibus ornare nunc, autem.",
    name: "Jessica Foxx",
  },
  {
    id: crypto.randomUUID(),
    rating: 2,
    avatar: user3,
    reviewText:
      "Lectus, nonummy et. Occaecat delectus erat, minima dapibus ornare nunc, autem.",
    name: "Lily Granger​",
  },
];

const ClientReviewSection = () => {
  return (
    <div className="client-review-section">
      <Heading>Our Happy clients!</Heading>
      <DividerLine />
      <div className="client-review-card-container">
        {ClientReviewArray.map((review) => (
          <ClientReviewCard key={review.id} {...review} />
        ))}
      </div>
    </div>
  );
};

export default ClientReviewSection;
