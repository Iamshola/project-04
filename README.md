![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) X ![logo copy](https://user-images.githubusercontent.com/43203736/64976059-55607180-d8a8-11e9-8504-8f64563a818d.png)

# Project 4: SPACE

## Overview
SPACE is a community aimed at entrepreneurs and student looking for space to work. It is a platform which enable users to find suitable venues to work based on various specifications. Users are able to comment on the posts and advise other users based on experiences. The repo can be accessed on [GitHub](https://github.com/Iamshola/project-04) and the deployed site can be viewed on [Heroku](https://space-project04.herokuapp.com/).

## Project Brief

### The following requirements:

* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end. Improve your employability by demonstrating a good understanding of testing principals.

### Languages and Technologies Used:
* HTML5
* CSS3
* SASS
* Node
* JavaScript (ES6)
* Git
* GitHub
* React and React extensions
* Webpack
* Bulma
* Yarn
* Babel
* Insomnia
* Python 3
* Django
* Heroku
* External API

### Timeframe:
7 days


### Approach Taken:

 Project plan

| Time      | Task         |
| ------------- |-------------|
| **1.5 days**    | Database design, brainstorming ideas, planning project days   |
| **2  days**     | Backend Initial set up      |
| **1.5 day**  | Frontend set and mapping      |
| **1 day**  | Styling    |
| **1 day** | Bug fixes, extra features     |
| **0.5 day** | Deployment     |


### Features

> **All Features:**

  - view the workspaces and view nearby workspaces in that area
  - filter through an index of workspaces to suit their requirements
  - register to create a workspace

> **Registered Users can:**

  - Add more workspaces
  - Create a user profile and update their profile
  - Create a new workspace
  - Log in and out
  - Make comments on workspaces and delete their comments
  - The Profile page show the workspace the user has contributed
  - View other user profiles


### Planning Process
![image](https://user-images.githubusercontent.com/43203736/64778972-d8a26000-d554-11e9-8605-929af37d07d8.png)


### Preview of site

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/43203736/64976881-3c58c000-d8aa-11e9-86a0-a22b358c4cb2.gif)

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/43203736/64978066-8b9ff000-d8ac-11e9-8af5-3a69c68a05c1.gif)


### Wins, Blockers, Snippet of Code
##### Wins
* Prior to building this app, I had only been exposed to Django and Python for less than a week.

``` Python
from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

class User(AbstractUser):
    image = models.CharField(max_length=200, blank=True)
    linked_In_Link = models.CharField(max_length=500, blank=True)
    user_city = models.CharField(max_length=60, blank=True)
    interest = models.CharField(max_length=600, blank=True)
    objects = UserManager()
```
``` Python
from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {
            'fields': ('username', 'password')
        }),
        (_('Personal info'), {
            'fields': ('first_name', 'last_name', 'email', 'image', 'linked_In_Link', 'user_city')
        }),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Important dates'), {
            'fields': ('last_login', 'date_joined')
        }),
    )

admin.site.register(User, UserAdmin)
```
* Incorporating relevant filters
* Using Bulma and sass as a tool to compliment my styling ideas.

##### Blockers
* Extending User Profiles
* Creating comments


### Future Features
* I would have loved to have included an app communication system so users can also share skills.
* Allowing users to save workspaces to be reviewed later.
* Adding Maps or Journey planner from current location to workspace.



### Course Curriculum
  Details of my training and links to more projects whilst at General Assembly -  12 Week Immersive.

> **Week 1-3 | Module One - Fundamentals**

  - HTML5
  - CSS3
  - Sass
  - JavaScript


> **Week 4**

  Project 1 : Frogger  | [GitHub](https://github.com/Iamshola/project-01) | [GH-Pages](https://iamshola.github.io/project-01/)

>**Week 5 | Module Two - React**

  - React.js
  - Routing
  - RESTFUL API
  - Third-party APIs

>**Week 6**

  Project 2 : CocktailBored  | [GitHub](https://github.com/Iamshola/Project3) | [GH-Pages](https://iamshola.github.io/Project-2/#/)

>**Week 7-8 | Module Three - Node and Express**

  - RESTFUL Routing
  - Node.js
  - Express
  - Token Authentication & Session Authentication
  - API Creation
  - Mocha and Chai

>**Week 9**

  Project 3 : Date-a-base | [GitHub](https://github.com/Iamshola/Project3) | [GH-Pages](https://iamshola.github.io/Project-2/#/)

>**Week 10-11 | Module Four - Python and Django**

  - Python
  - SQL
  - Django
  - Token Authentication

>**Week 12**

  Project 4 : Space | [GitHub](https://github.com/Iamshola/project-04) | [Herouku](https://date-a-base-aos.herokuapp.com/#/)


  ### Contact
  Adesola Oni-Shogbonyo\
  Email : s.oni-shogbonyo@hotmail.co.uk\
  [Portfolio](https://iamshola.github.io/) | [Linkedin](https://www.linkedin.com/in/adesola-oni-shogbonyo/) | [GitHub](https://github.com/Iamshola)
