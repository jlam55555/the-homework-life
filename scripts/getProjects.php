<?php
  $projects = array(
    "extras" => scandir("../extras"),
    "publications" => scandir("../publications"),
    "downloads" => scandir("../downloads")
  );
  foreach($projects as $type => $project) {
    unset($projects[$type][0]);
    unset($projects[$type][1]);
    $projects[$type] = array_values($projects[$type]);
  }
  echo json_encode($projects);
?>
