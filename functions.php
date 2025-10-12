<?php // Function to determine the level
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

// Function to determine the cost
function determinecost($level) {
if (in_array($level, ['I|115', 'II|115', 'III|115', 'Master|115'])) {
return "115";
} elseif ($level == 'Master|165') {
return "165";
} else {
return "115";
}
}

function getCurrentDate() {
date_default_timezone_set('America/Phoenix');
$currentDate = date('m/d/Y h:i:s A');
return $currentDate;
}

// Usage
$currentDate = getCurrentDate();

add_action('gform_after_submission_17', 'individual_reg', 10, 2);

function individual_reg($entry, $form) {

$workshop_type = rgar($entry, '1');
$first_name = rgar($entry, '3.3');
$last_name = rgar($entry, '3.6');
$street_address = rgar($entry, '4.1');
$city = rgar($entry, '4.3');
$state = rgar($entry, '4.4');
$zip_code = rgar($entry, '4.5');
$email = rgar($entry, '5');
$daytime_phone = rgar($entry, '6');
$cell_phone = rgar($entry, '7');
$participant_first_name = rgar($entry, '8.3');
$participant_last_name = rgar($entry, '8.6');
$group_name = "INDIVIDUAL - " . $participant_first_name . " " . $participant_last_name;
$participant_age = rgar($entry, '9');
$participant_gender = rgar($entry, '10');
$participant_grade = rgar($entry, '12');
$participant_race = rgar($entry, '11');
$participant_class = rgar($entry, '13');
$participant_level_raw = rgar($entry, '17');
$participant_cost = determinecost($participant_level_raw);
$payment_method = 'Credit/Debit Card';
$reg_date = getCurrentDate();


$participant_level = determinelevel($participant_level_raw);

if ($workshop_type === 'Folklorico') {
$participant_class = 'Dance';
};

if ($payment_method === 'Credit/Debit Card') {
$payment_1_date = getCurrentDate();
$payment_1_amount = $participant_cost;

} else {
$payment_1_date = '';
$payment_1_amount = '';
};

$mysqli = get_custom_db_connection();
if (!$mysqli) {
return; 
}


$stmt = $mysqli->prepare("INSERT INTO groups (workshop_type, group_name, user_first_name, user_last_name, user_phone, user_email, total_cost, registration_date, payment_1_date, payment_1_amount, payment_1_method) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
if ($stmt) {
$stmt->bind_param("sssssssssss", $workshop_type, $group_name, $first_name, $last_name, $cell_phone, $email, $participant_cost, $reg_date, $payment_1_date, $payment_1_amount, $payment_method); // 's' for string type
if ($stmt->execute()) {
error_log("Workshop type '{$workshop_type}' saved successfully.");
} else {
error_log("Error saving to groups: " . $stmt->error);
echo("Error saving to groups: " . $stmt->error);
print("Error saving to groups: " . $stmt->error);
}
$stmt->close();
} else {
error_log("Error preparing SQL statement: " . $mysqli->error);
print("Error saving to groups: " . $stmt->error);

}



$mysqli = get_custom_db_connection();
if (!$mysqli) {
return; 
}


$stmt = $mysqli->prepare("INSERT INTO performers (first_name, last_name, group_name, age, gender, grade, class, level, race, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
if ($stmt) {
$stmt->bind_param("ssssssssss", $participant_first_name, $participant_last_name, $group_name, $participant_age, $participant_gender, $participant_grade, $participant_class, $participant_level, $participant_race, $participant_cost);
$stmt->execute();
$stmt->close();
} else {
error_log("Error preparing statement: " . $mysqli->error);
echo("Error preparing statement: " . $mysqli->error);
print("Error saving to performers: " . $stmt->error);
}


$mysqli = get_custom_db_connection();
if (!$mysqli) {
return; // Exit if the connection fails
}

$stmt = $mysqli->prepare("INSERT INTO directors (first_name, last_name, street_address, city, state, zip_code, email, group_name, daytime_phone, cell_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
if ($stmt) {
$stmt->bind_param("ssssssssss", $first_name, $last_name, $street_address, $city, $state, $zip_code, $email, $group_name, $daytime_phone, $cell_phone);
$stmt->execute();
$stmt->close();
} else {
error_log("Error saving to 'directors': " . $mysqli->error);
echo("Error saving to 'directors': " . $mysqli->error);
print("Error saving to directors: " . $stmt->error);
}

if ($payment_method === 'Purchase Order') {
$stmt = $mysqli->prepare("UPDATE groups SET paid = 'No' WHERE group_name = ?");
if ($stmt) {
$stmt->bind_param("s", $group_name); // Use the group name or another unique identifier
$stmt->execute();
$stmt->close();
error_log("Payment method is Purchase Order, 'paid' set to 'No' for group: {$group_name}");
} else {
error_log("Error preparing SQL statement for updating 'paid' column: " . $mysqli->error);
}
} elseif ($payment_method === 'Credit/Debit Card') {
$stmt = $mysqli->prepare("UPDATE groups SET paid = 'Yes' WHERE group_name = ?");
if ($stmt) {
$stmt->bind_param("s", $group_name); // Use the group name or another unique identifier
$stmt->execute();
$stmt->close();
error_log("Payment method is Credit/Debit Card, 'paid' set to 'Yes' for group: {$group_name}");
} else {
error_log("Error preparing SQL statement for updating 'paid' column: " . $mysqli->error);
}
}

// Close the database connection
$mysqli->close();
}

// Hook into Gravity Forms submission to store data in the custom database
add_action('gform_after_submission_20', 'group_reg', 10, 2);

function group_reg($entry, $form) {

// Retrieve Group Name from the form submission
$workshop_type = rgar($entry, '1');
$group_type = rgar($entry, '3');
$showcase = rgar($entry, '4');
$garibaldi = rgar($entry, '5');
$competition = rgar($entry, '6');
$group_name = rgar($entry, '7');
$school_name = rgar($entry, '8');
$indiv_first_name = rgar($entry, '10.3');
$indiv_last_name = rgar($entry, '10.6');
$indiv_email = rgar($entry, '11');
$indiv_phone = rgar($entry, '12');
$director_1_first_name = rgar($entry, '13.3');
$director_1_last_name = rgar($entry, '13.6');
$director_1_address = rgar($entry, '14.1');
$director_1_city = rgar($entry, '14.3');
$director_1_state = rgar($entry, '14.4');
$director_1_zip_code = rgar($entry, '14.5');
$director_1_daytime_phone = rgar($entry, '15');
$director_1_cell_phone = rgar($entry, '16');
$director_1_email = rgar($entry, '17');
$director_2_first_name = rgar($entry, '18.3');
$director_2_last_name = rgar($entry, '18.6');
$director_2_address = rgar($entry, '19.1');
$director_2_city = rgar($entry, '19.3');
$director_2_state = rgar($entry, '19.4');
$director_2_zip_code = rgar($entry, '19.5');
$director_2_daytime_phone = rgar($entry, '20');
$director_2_cell_phone = rgar($entry, '21');
$director_2_email = rgar($entry, '22');
$payment_method = rgar($entry, '600');
$total_cost = rgar($entry, '602');
$reg_date = getCurrentDate();
$po_number = rgar($entry, '608');

if ($payment_method === 'Credit/Debit Card') {
$payment_1_amount = rgar($entry, '602');
};

// Establish the database connection
$mysqli = get_custom_db_connection();
if (!$mysqli) {
return; // Exit if the connection fails
}

$stmt = $mysqli->prepare("INSERT INTO groups
(group_name, group_type, workshop_type, showcase_performance, garibaldi_performance, competition_exclusion, school_name, user_first_name, user_last_name, user_email, user_phone, total_cost, registration_date, payment_1_amount, payment_1_method, po_number)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
if ($stmt) {
$stmt->bind_param(
"ssssssssssssssss",
$group_name,
$group_type,
$workshop_type,
$showcase,
$garibaldi,
$competition,
$school_name,
$indiv_first_name,
$indiv_last_name,
$indiv_email,
$indiv_phone,
$total_cost,
$reg_date,
$payment_1_amount,
$payment_method,
$po_number
);
if ($stmt->execute()) {
error_log("Group info successfully inserted.");
} else {
error_log("Error executing group query: " . $stmt->error);
echo("Error executing group query: " . $stmt->error);
}
$stmt->close();
} else {
error_log("Error preparing statement for 'directors': " . $mysqli->error);
echo("Error preparing statement for 'directors': " . $mysqli->error);
}

if ($payment_method === 'Purchase Order') {
$stmt = $mysqli->prepare("UPDATE groups SET paid = 'No' WHERE group_name = ?");
if ($stmt) {
$stmt->bind_param("s", $group_name); // Use the group name or another unique identifier
$stmt->execute();
$stmt->close();
error_log("Payment method is Purchase Order, 'paid' set to 'No' for group: {$group_name}");
} else {
error_log("Error preparing SQL statement for updating 'paid' column: " . $mysqli->error);
}
} elseif ($payment_method === 'Credit/Debit Card') {
$stmt = $mysqli->prepare("UPDATE groups SET paid = 'Yes' WHERE group_name = ?");
if ($stmt) {
$stmt->bind_param("s", $group_name); // Use the group name or another unique identifier
$stmt->execute();
$stmt->close();
error_log("Payment method is Credit/Debit Card, 'paid' set to 'Yes' for group: {$group_name}");
} else {
error_log("Error preparing SQL statement for updating 'paid' column: " . $mysqli->error);
}
}

/* // Number of participants (up to 75)
$num_participants = rgar($entry, '604');

// Array to store participant data
$participants = [];

// Loop through participant fields and retrieve data
for ($i = 0; $i < $num_participants; $i++) {
    $participant_offset=$i * 7; // Each participant has 8 fields

    $participants[]=[ 'first_name'=> rgar($entry, (28 + $participant_offset) . '.3'),
    'last_name' => rgar($entry, (28 + $participant_offset) . '.6'),
    'age' => rgar($entry, (29 + $participant_offset)),
    'gender' => rgar($entry, (30 + $participant_offset)),
    'race' => rgar($entry, (31 + $participant_offset)),
    'grade' => rgar($entry, (32 + $participant_offset)),
    'class' => rgar($entry, (33 + $participant_offset)),
    'level' => rgar($entry, (34 + $participant_offset)),
    ];
    } */

    // Initialize participants array
    $participants = [];
    $i = 0;

    // Keep checking for participants as long as we find valid data
    while (true) {
    $participant_offset = $i * 7;

    // Check if at least one required field exists for this participant
    // (using first_name as the key indicator)
    $first_name = rgar($entry, (28 + $participant_offset) . '.3');

    // Break the loop if we don't find a first name
    if (empty($first_name)) {
    break;
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

    // Add a safety limit to prevent infinite loops (optional)
    if ($i > 100) { // Set this to a reasonable maximum
    error_log("Warning: Reached maximum participant limit of 100");
    break;
    }
    }

    // Establish the database connection
    $mysqli = get_custom_db_connection();
    if (!$mysqli) {
    return; // Exit if the connection fails
    }

    // Prepare the statement for inserting data
    $stmt = $mysqli->prepare("INSERT INTO performers (group_name, first_name, last_name, age, gender, grade, class, level, race, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if ($stmt) {
    // Loop through each participant and insert their data
    foreach ($participants as $participant) {
    $participant_level = determinelevel($participant['level']);
    $participant_cost = determinecost($participant['level']);


    if ($workshop_type === 'Folklorico') {
    $participant['class'] = 'Dance';
    }

    $stmt->bind_param(
    "sssissssss",
    $group_name,
    $participant['first_name'],
    $participant['last_name'],
    $participant['age'],
    $participant['gender'],
    $participant['grade'],
    $participant['class'],
    $participant_level,
    $participant['race'],
    $participant_cost
    );

    if ($stmt->execute()) {
    error_log("Participant info successfully inserted.");
    } else {
    error_log("Error executing participant query: " . $stmt->error);
    echo("Error executing participant query: " . $stmt->error);
    }
    }

    $stmt->close();
    } else {
    error_log("Error preparing statement for 'performers': " . $mysqli->error);
    echo("Error preparing statement for 'performers': " . $mysqli->error);
    }


    // Establish the database connection
    $mysqli = get_custom_db_connection();
    if (!$mysqli) {
    return; // Exit if the connection fails
    }

    $stmt = $mysqli->prepare("INSERT INTO directors
    (group_name, first_name, last_name, street_address, city, state, zip_code, daytime_phone, cell_phone, email, d2_first_name, d2_last_name, d2_daytime_phone, d2_cell_phone, d2_email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt) {
    $stmt->bind_param(
    "sssssssssssssss",
    $group_name,
    $director_1_first_name,
    $director_1_last_name,
    $director_1_address,
    $director_1_city,
    $director_1_state,
    $director_1_zip_code,
    $director_1_daytime_phone,
    $director_1_cell_phone,
    $director_1_email,
    $director_2_first_name,
    $director_2_last_name,
    $director_2_daytime_phone,
    $director_2_cell_phone,
    $director_2_email
    );
    if ($stmt->execute()) {
    error_log("Directors successfully inserted.");
    } else {
    error_log("Error executing directors query: " . $stmt->error);
    echo("Error executing directors query: " . $stmt->error);
    }
    $stmt->close();
    } else {
    error_log("Error preparing statement for 'directors': " . $mysqli->error);
    echo("Error preparing statement for 'directors': " . $mysqli->error);
    }

    // Map the field IDs to the corresponding columns
    $song_data = [
    'song_1_title' => rgar($entry, '588'),
    'song_1_length' => rgar($entry, '589'),
    'song_2_title' => rgar($entry, '591'),
    'song_2_length' => rgar($entry, '593'),
    'song_3_title' => rgar($entry, '590'),
    'song_3_length' => rgar($entry, '592'),
    ];

    // Check if all song fields are empty
    if (
    empty($song_data['song_1_title']) &&
    empty($song_data['song_1_length']) &&
    empty($song_data['song_2_title']) &&
    empty($song_data['song_2_length']) &&
    empty($song_data['song_3_title']) &&
    empty($song_data['song_3_length'])
    ) {
    // Exit if no song data is provided
    error_log("No song data to insert.");
    return;
    }

    // Establish the database connection
    $mysqli = get_custom_db_connection();
    if (!$mysqli) {
    return; // Exit if the connection fails
    }

    // Prepare the SQL statement for inserting data into the "songs" table
    $stmt = $mysqli->prepare("
    INSERT INTO songs (group_name, song_1_title, song_1_length, song_2_title, song_2_length, song_3_title, song_3_length)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ");

    if ($stmt) {
    // Bind the parameters to the statement
    $stmt->bind_param(
    "sssssss", // Seven string parameters
    $group_name,
    $song_data['song_1_title'],
    $song_data['song_1_length'],
    $song_data['song_2_title'],
    $song_data['song_2_length'],
    $song_data['song_3_title'],
    $song_data['song_3_length']
    );

    // Execute the statement
    if ($stmt->execute()) {
    error_log("Songs successfully inserted.");
    } else {
    error_log("Error executing songs query: " . $stmt->error);
    echo("Error executing songs query: " . $stmt->error);
    }

    // Close the statement
    $stmt->close();
    } else {
    error_log("Error preparing statement for 'songs': " . $mysqli->error);
    echo("Error preparing statement for 'songs': " . $mysqli->error);
    }

    // Establish the database connection
    $mysqli = get_custom_db_connection();
    if (!$mysqli) {
    return; // Exit if the connection fails
    }

    if ($payment_method === 'Purchase Order') {
    $stmt = $mysqli->prepare("UPDATE groups SET paid = 'No' WHERE group_name = ?");
    if ($stmt) {
    $stmt->bind_param("s", $group_name); // Use the group name or another unique identifier
    $stmt->execute();
    $stmt->close();
    error_log("Payment method is Purchase Order, 'paid' set to 'No' for group: {$group_name}");
    } else {
    error_log("Error preparing SQL statement for updating 'paid' column: " . $mysqli->error);
    }
    } elseif ($payment_method === 'Credit/Debit Card') {
    $stmt = $mysqli->prepare("UPDATE groups SET paid = 'Yes' WHERE group_name = ?");
    if ($stmt) {
    $stmt->bind_param("s", $group_name); // Use the group name or another unique identifier
    $stmt->execute();
    $stmt->close();
    error_log("Payment method is Credit/Debit Card, 'paid' set to 'Yes' for group: {$group_name}");
    } else {
    error_log("Error preparing SQL statement for updating 'paid' column: " . $mysqli->error);
    }
    }

    // Close the database connection
    $mysqli->close();
    }

    ?>