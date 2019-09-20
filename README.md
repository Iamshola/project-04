![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) X ![logo copy](https://user-images.githubusercontent.com/43203736/64976059-55607180-d8a8-11e9-8504-8f64563a818d.png)

# Project 4: SPACE

### Installation

* Clone or download the repo
* `pipenv shell` to move into virtual environment
* `yarn` and `pipenv install` to install dependencies
* ` python manage.py dumpdata jwt_auth --output jwt_auth/fixtures.json --indent=2` and `python manage.py dumpdata workspaces --output workspaces/fixtures.json --indent=2` to populate database
* `yarn serve:backend` to run back end
* `yarn serve:frontend` to run front end

## Overview
SPACE is a community aimed at entrepreneurs and student looking for space to work. It is a platform which enable users to find suitable venues to work based on various specifications. Users are able to comment on the posts and advise other users based on experiences. The repo can be accessed on [GitHub](https://github.com/Iamshola/project-04) and the deployed site can be viewed on [Heroku](https://space-project04.herokuapp.com/).

## Project Brief

### The brief requirements were:

* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes**
* **Have a visually impressive design**
* **Be deployed online** so it's publicly accessible.
* **Have automated tests**

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
* External API's

### Timeframe:
7 days


### Approach Taken:

######  Project plan

| Time      | Tasks         |
| ------------- |-------------|
| **1 day**    | Database design, brainstorming ideas, planning project days   |
| **2  days**     | Backend Initial set up      |
| **2 days**  | Frontend set and mapping      |
| **1 day**  | Styling and Troubleshooting With Instructor   |
| **1 day** | Bug fixes  |
| **0.5 day** | Deployment     |

#### Planning Process
![image](https://user-images.githubusercontent.com/43203736/64778972-d8a26000-d554-11e9-8605-929af37d07d8.png)

#### Trello Board
![image](https://user-images.githubusercontent.com/43203736/65322362-84bff880-db9e-11e9-8e87-7849b663565c.png)

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


### Preview of site

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/43203736/64976881-3c58c000-d8aa-11e9-86a0-a22b358c4cb2.gif)

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/43203736/64978066-8b9ff000-d8ac-11e9-8af5-3a69c68a05c1.gif)


### Wins and Blockers
##### Wins

* As a frequent users of workspace, I appreciate that users will have different requirements for each visit. I successfully managed to incorporate the relevant filters that I wanted and they worked well.

* For this project, I wanted to showcase my ability to use a css tools such as Bulma and SASS as a tool to compliment my styling ideas and produce a visually appealing product.

##### Blockers
* I really wanted my users to provide more information about themselves rather than the basic authentication info. To achieve this, I extended the in-built Django User and created the custom user. This was a nice challenge and was very fulfilling once achieved.

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
* Creating comments was a little tough as I tried to use the same approach for all my models. However, the comment model will be when creating a user profile. To overcome this, I decided to use Django's 'read only' feature and created PopulatedSerializer which were then used in my views.

``` Python
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    workspace = WorkspaceSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'content', 'user', 'created_at', 'workspace',)
```


``` Python
class CommentList(APIView):
    def post(self, request, pk):
        # deserialiser the data
        workspace = Workspace.objects.get(pk=pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            # auto sets user to be logged in user
            serializer.save(workspace=workspace, user=request.user)
            serializer = PopulatedWorkspaceSerializer(workspace)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)
```

* I decided to complete this project on my own as I wanted to develop my knowledge of Django and Python as we had only learnt it a week prior to completing the course. I found this aspect quite tough as it should loop holes in my knowledge additionally I did not manage to implement as many features as I hoped.


### Future Features
* I would have loved to have included an app communication system so users can also share skills.
* Adding a tool to allow users to save workspaces to their profile to be reviewed later.
* I would love to add maps or journey planner from current location to workspace as potential future feature of this product.



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

  Project 3 : Date-a-base | [GitHub](https://github.com/Iamshola/Project3) | [Herouku](https://datingexp.herokuapp.com/#/)

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
