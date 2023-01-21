# Trera
[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%2336BCF7&lines=Last+task+manager+you+will+need)](https://git.io/typing-svg)


## api documentation

#### Auth

* POST `http://localhost:3001/auth/login`
* POST `http://localhost:3001/auth/singUp`

#### Project

* GET `http://localhost:3001/projects/get-all`
* POST `http://localhost:3001/projects/create-project`
  - `name`
  

* DELETE `http://localhost:3001/projects/delete-project`
  - `project_id`


#### Column

* GET `http://localhost:3001/columns/get-project-columns/:projectId`
* POST `http://localhost:3001/columns/create-column`
  - `name`
  - `position`
  - `project_id`


#### Card
* GET `http://localhost:3001/card/:columnId`
* POST `http://localhost:3001/card/`
    - `name`
    - `summery`
    - `description`
    - `column_id`