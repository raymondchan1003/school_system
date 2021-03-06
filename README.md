**School-System**

**Packages Used**
"dependencies": {
"express": "^4.18.1",
"mysql2": "^2.3.3",
"sequelize": "^6.19.2"
},
"devDependencies": {
"nodemon": "^2.0.16"
}

**Routes**

1. /api/register
2. /api/commonstudents
3. /api/suspend
4. /api/retrievefornotifications

**Database structure**
Total 5 table required in this system, listed as below:

1. Teacher (table to store teacher data)
2. Student (table to store student data)
3. Notification (table to store notification data)
4. TeacherStudent (junction table in between teacher and student)
5. StudentNotification (junction table in between student and notification)

Tables relationship:

1. One-to-Many:

- Teacher table and Notification table
  (A teacher can create many notications, each of the created notifation only belong to one teacher)

2. Many-to-Many:

- Teacher table and Student table
  (A teacher can register many students, each of the student also can be registered by many teachers)
- Student table and Notification table
  (A student can received many kind of the notifications, each of the notification also can be sent by many students)

**Install _MySQL Workbench_ to manage database and interact with mysql**
**Database Setup Instruction**

1. Create a new connection or used any existing connection in MySQL Workbench.
2. Create a new schema, default name set in _config/db-config.js_ file is 'school-system'.
3. Configure your own connection details in _config/db-config.js_ file, for ex: USER, PASSWORD fields,
   make sure DATABASE name insert is match with your created schema name in step 2.

**Make sure _node_ and _npm_ had installed**
**Express App Setup Instuction**

1. Run 'npm install' to install all the required packages.
2. Run 'node index.js' or 'nodemon index.js' to start the node server process,
   default port num bind in this app was set to port(1234), localhost:1234.
3. Required database table will auto created under your schema once your start the node process.
