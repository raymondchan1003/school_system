**UNIT TEST**

**_POST /api/register_**

1. Require both 'teacher' and 'students' params in request body.
2. Each teacher/student has own unique email, no duplication email allow to insert to teacher/student table.
3. Auto add new teacher/student email if found no exist (assume user already pass login validation and have access control ).
4. Both teacher id and student id will be added as the foreign keys in junction table (teacherstudent), for each success request.
5. This request only allow in POST method, header content-type is application/json, success response status is HTTP 204.

**_GET /api/commonstudents_**

1. Require 'teacher' as request query.
2. Response invalid teacher error if enter email not exist.
3. No duplicate students email will be return from response.
4. Only common students email will be return from response if 2 or more teacher email enter as request query.
5. This request only allow in GET method, success response status is HTTP 200.

**_POST /api/suspend_**

1. Require 'students' params in request body.
2. Response invalid student error if enter email not exist.
3. Response message as student mail had been suspended previously if enter email was added to suspended list.
4. Response message as student mail had been added to suspended list for each success request.
5. This request only allow in POST method, header content-type is application/json, success response status is HTTP 204.

**_POST /api/retrievefornotifications_**

1. Require both 'teacher' and 'notification' params in request body.
2. Each teacher/student has own unique email, no duplication email allow to insert to teacher/student table.
3. Auto add new teacher/student email if found no exist (assume user already pass login validation and have access control ).
4. Auto add new notication belong to the request teacher if found no exist and (assume user already pass login validation and have access control ).
5. Each notification text added will not included any @mentioned from the notification request body.
6. Response message as fail to send if unsuccess create/find notication that belong to the request teacher.
7. No duplicate students email will be return from response.
8. No suspended students email will be return from response.
9. Both notification id and student id will be added as the foreign keys in junction table (studentnotification), for each success request.
10. This request only allow in POST method, header content-type is application/json, success response status is HTTP 200.
