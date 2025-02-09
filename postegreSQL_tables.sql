CREATE TABLE activities (
  activity_id BIGSERIAL PRIMARY KEY, 
  name TEXT,
  number INT,
  type TEXT,
  objective TEXT,
  brief_descriptor TEXT,
  pre_conditions TEXT,
  activity_descriptor TEXT,
  limits TEXT,
  during_activity TEXT,
  post_activity_conditions TEXT,
  immediate_results TEXT,
  results_conclusion TEXT,
  other_key_information TEXT
);

CREATE TABLE workpackages (
  work_package_id BIGSERIAL PRIMARY KEY,
  activity_id BIGINT REFERENCES activities (activity_id) ON DELETE CASCADE, 
  work_package_name TEXT
);

CREATE TABLE themes (
  theme_id BIGSERIAL PRIMARY KEY,
  activity_id BIGINT REFERENCES activities (activity_id) ON DELETE CASCADE,
  theme_name TEXT
);

CREATE TABLE activitytime (
  time_id BIGSERIAL PRIMARY KEY,
  activity_id BIGINT REFERENCES activities (activity_id) ON DELETE CASCADE,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  days INT,
  hours NUMERIC
);

CREATE TABLE locations (
  location_id BIGSERIAL PRIMARY KEY,
  activity_id BIGINT REFERENCES activities (activity_id) ON DELETE CASCADE,
  levee_stretch TEXT,
  latitude NUMERIC,
  longitude NUMERIC,
  altitude NUMERIC,
  descriptor TEXT
);

CREATE TABLE equipment (
  equipment_id BIGSERIAL PRIMARY KEY,
  activity_id BIGINT REFERENCES activities (activity_id) ON DELETE CASCADE,
  equipment_name TEXT
);

CREATE TABLE monitoringsensors (
  sensor_id BIGSERIAL PRIMARY KEY,
  activity_id BIGINT REFERENCES activities (activity_id) ON DELETE CASCADE,
  sensor_name TEXT
);

CREATE TABLE infrastructureknowledge (
  knowledge_id BIGSERIAL PRIMARY KEY,
  activity_id BIGINT REFERENCES activities (activity_id) ON DELETE CASCADE,
  knowledge_description TEXT
);