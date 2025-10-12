import Project1 from "../assets/project1.png";
import Project2 from "../assets/what-to-watch-screenshot.png";
import Project3 from "../assets/project2.png";
import Project4 from "../assets/project4.png";
import ProjectCard from "./ProjectCard";
import { projectAboutContent } from "../data/projectContent";

// Code snippets for showcasing
const participantLoopCode = `// Dynamic participant data collection from Gravity Forms
// This loop handles an unknown number of participants dynamically
$participants = [];
$i = 0;

while (true) {
  $participant_offset = $i * 7;

  // Check if participant exists by looking for first_name
  $first_name = rgar($entry, (28 + $participant_offset) . '.3');

  if (empty($first_name)) {
    break; // No more participants
  }

  $participants[] = [
    'first_name' => $first_name,
    'last_name' => rgar($entry, (28 + $participant_offset) . '.6'),
    'age' => rgar($entry, (29 + $participant_offset)),
    'gender' => rgar($entry, (30 + $participant_offset)),
    'race' => rgar($entry, (31 + $participant_offset)),
    'grade' => rgar($entry, (32 + $participant_offset)),
    'class' => rgar($entry, (33 + $participant_offset)),
    'level' => rgar($entry, (34 + $participant_offset)),
  ];

  $i++;

  // Safety limit to prevent infinite loops
  if ($i > 100) {
    error_log("Warning: Reached maximum participant limit");
    break;
  }
}`;

const helperFunctionsCode = `// Helper function to parse and determine skill level
function determinelevel($thelevel) {
  if ($thelevel == 'I|115') {
    return "I";
  } elseif ($thelevel == 'II|115') {
    return "II";
  } elseif ($thelevel == 'III|115') {
    return "III";
  } elseif (strpos($thelevel, 'Master|') === 0) {
    return "Master";
  } else {
    return "I"; // Default level
  }
}

// Helper function to extract cost from level string
function determinecost($level) {
  if (in_array($level, ['I|115', 'II|115', 'III|115', 'Master|115'])) {
    return "115";
  } elseif ($level == 'Master|165') {
    return "165";
  } else {
    return "115";
  }
}`;

const conditionalPaymentLogicCode = `// Conditional logic for handling different payment methods
$payment_method = rgar($entry, '22');
$payment_1_amount = rgar($entry, '21'); 
$payment_1_date = date('Y-m-d H:i:s');

if ($payment_method === 'Purchase Order') {
$stmt = $mysqli->prepare("UPDATE groups SET paid = 'No' WHERE group_name = ?");
if ($stmt) {
$stmt->bind_param("s", $group_name); 
$stmt->execute();
$stmt->close();
error_log("Payment method is Purchase Order, 'paid' set to 'No' for group: {$group_name}");
} else {
error_log("Error preparing SQL statement for updating 'paid' column: " . $mysqli->error);
}
} elseif ($payment_method === 'Credit/Debit Card') {
$stmt = $mysqli->prepare("UPDATE groups SET paid = 'Yes' WHERE group_name = ?");
if ($stmt) {
$stmt->bind_param("s", $group_name); 
$stmt->execute();
$stmt->close();
error_log("Payment method is Credit/Debit Card, 'paid' set to 'Yes' for group: {$group_name}");
} else {
error_log("Error preparing SQL statement for updating 'paid' column: " . $mysqli->error);
}
}`;

export default function Projects() {
  return (
    <section id="projects">
      <div className="container m-auto px-4 sm:py-12">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <div className="flex flex-col gap-10 mt-11">
          <ProjectCard
            image={Project2}
            title="What to Watch"
            description="WhatToWatch is a modern web application that gamifies movie discovery through a swipe-based interface. Built with Next.js App Router, the app integrates with The Movie Database (TMDB) API to deliver real-time popular movie data in an engaging, mobile-first experience."
            technologies={["Next.js", "React", "Tailwind CSS", "JavaScript"]}
            aboutContent={projectAboutContent.whatToWatch}
            githubUrl="https://github.com/lukejohnsen/what-to-watch"
            codeLanguage="php"
            codeTitle="Data Processing Helper Functions"
          />
          <ProjectCard
            image={Project1}
            title="Tucson International Mariachi Conference (TIMC) Registration Form & Database V1"
            description="Custom WordPress integration with Gravity Forms handling complex multi-participant registration. Features dynamic form data collection, MySQL database integration with prepared statements, and Stripe payment processing."
            technologies={[
              "PHP",
              "MySQL",
              "WordPress",
              "Gravity Forms",
              "Stripe API",
            ]}
            aboutContent={projectAboutContent.timc}
            codeBlocks={[
              {
                title: "Dynamic Participant Collection Logic",
                code: participantLoopCode,
              },
              {
                title: "Data Processing Helper Functions",
                code: helperFunctionsCode,
              },
              {
                title: "Conditional Payment Logic",
                code: conditionalPaymentLogicCode,
              },
            ]}
            codeLanguage="php"
            codeTitle="Dynamic Participant Collection Logic"
          />
          <ProjectCard
            image={Project3}
            title="Tucson Terror in the Corn WordPress Theme"
            description="Custom responsive WordPress theme for a Halloween haunted house and corn maze attraction. Features mobile-first design and Bootstrap integration."
            technologies={[
              "PHP",
              "WordPress",
              "Bootstrap",
            ]}
            liveUrl="https://tucsonterrorinthecorn.com/"
          />{" "}
          <ProjectCard
            image={Project4}
            title="RenDATEvous Date-Night Randomizer"
            description="Full-stack MERN application helping couples discover date night activities. Features GraphQL API and MongoDB for data management."
            technologies={["React", "Node.js", "Express", "GraphQL", "MongoDB"]}
            githubUrl="https://github.com/Blitman12/ren-date-vous"
          />
        </div>
      </div>
    </section>
  );
}
