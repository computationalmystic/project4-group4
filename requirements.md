# Requirement Analysis For A Programming Assignment Software System

1. Users
    - Students
    - Professors
    - TAs

2. User Requirements
    - Students:
        - Submit and see programming assignments and recieve feedback on their work
            - Visualize assignment schedule through a calendar and to-do list representation
        - View their assignment score, course grade, and anonymous assignment score spreads for the course
    - Professors:
        - Post and revise assigments
        - View all students and TAs involved in the course
        - See the status of assignments for each student
        - Assign TAs to grade projects for specific course sections
        - Option to use full TA functionality as well as override scores for assignments
        - Add and remove students, and move them to different sections
    - TAs:
        - Grade student submissions
        - See the status of assignments for each student in their section
        - Provide feedback to individual students

3. Data and Non-Functional Constraints
    - Users are invited by course instructor(s)
        - University email
    - Users will have a profile
        - Profiles need a unique indentifier
            - Username, student ID or university email address
    - Users are designated a privelege level by corresponding invite
    - All entities within the system (listed below in DB Schema) should have unique keys,
    serving as primary keys for their relation; stringing together entities via foreign keys
    - Submitting an assignment should remove that assignment from a list of uncompleteds
        - DB relation difference between Assignments and Submissions per student

4. System Requirements
    - Website platform
        - End-user UI
        - Admin UI
            - Revise data in DB via priveleged users
    - Internet access
    - Web domain and hosting
    - Database with schema that involves tables for:
        - Users
        - Courses
        - Sections
        - Assignments
        - Submissions
    - Server to host the database and the website
