# fps-aim-trainer-backend

`

1. How to remove unique constraint on heroku and locally.

## Find constraint name with

    SELECT tc.constraint_name, tc.table_name, kcu.column_name,

      ccu.table_name AS foreign_table_name,

      ccu.column_name AS foreign_column_name

    FROM information_schema.table_constraints AS tc

      JOIN information_schema.key_column_usage AS kcu

      ON tc.constraint_name = kcu.constraint_name

    JOIN information_schema.constraint_column_usage AS ccu

      ON ccu.constraint_name = tc.constraint_name

    WHERE constraint_type = 'CONSTRAINT_NAME_HERE'

2.  Get the name of the constraint under the `constraint_name` column returned from the command above. If it's heroku, it will say yourtablename_yourcolumnname_key if you are getting the unique constraint, but if you are doing it locally with postgres then it will say yourcolumnname_unique, so note the difference between key and unique at the end.

3.        ALTER TABLE table_name DROP CONSTRAINT constraint_name;
