# TodoList API Documentation

## URL example

http://localhost:3000

---

### User Sign Up API

* **End Point:** `/users/signup`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Content-Type | String | Only accept `application/json`. |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| name | String | Required |
| email | String | Required |
| password | String | Required |

* **Request Body Example:**

```
{
  "name":"test",
  "email":"test@test.com",
  "password":"test"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| access_token | String | Access token from server. |
| user | `User Object` | User information |

* **Success Response Example:**

```
{
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6joiYXJ0aHVIjoxNjEzNTY3MzA0fQ.6EPCOfBGynidAfpVqlvbHGWHCJ5LZLtKvPaQ",
    "user": {
      "id": 11245642,
      "name": "Pei",
      "email": "pei@appworks.tw",
    }
  }
}
```

* **Email Already Exists: 403**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Client Error Response: 400**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |


----
### User Sign In API

* **End Point:** `/users/signin`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Content-Type | String | Only accept `application/json`. |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| email | String | User's email |
| password | String | User's password |

* **Request Body Example:**

```
{
  "email":"test@test.com",
  "password":"test"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| access_token | String | Access token from server. |
| user | `User Object` | User information |

* **Success Response Example:**

```
{
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6joiYXJ0aHVIjoxNjEzNTY3MzA0fQ.6EPCOfBGynidAfpVqlvbHGWHCJ5LZLtKvPaQ",
    "user": {
      "id": 11245642,
      "name": "Pei",
      "email": "pei@appworks.tw"
    }
  }
}
```

* **Sign In Failed (Wrong Password, User Not Found, Wrong provider): 403**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Client Error Response: 400**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

* **Server Error Response: 500**

| Field | Type | Description |
| :---: | :---: | :--- |
| error | String | Error message. |

----
## Task

### Task API

>Authorization

* **End Point:** `/tasks`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| content | String | Task's content |
| expired_at | DATETIME | Task's expired time. |
| state | String | ENUM('ongoing', 'done', 'expire') |
| next_time | DATETIME | Task's next time. |
| repeat_period | String | ENUM('none', 'day', 'month', 'year') |

* **Request Body Example:**

```
{
    "content": "後端作業",
    "state": "ongoing",
    "expired_at": "2025-12-04 18:30:00",
    "repeat_period": "none"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| task.id | INT | Task's id. |

* **Success Response Example:**

```
{
    "message": "Create task",
    "data": {
        "task": {
            "id": 7
        }
    }
}
```

----
### Tasks Update API

>Authorization

* **End Point:** `/tasks/:id`

* **Method:** `PUT`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| content | String | Task's content |
| expired_at | DATETIME | Task's expired time. |
| state | String | ENUM('ongoing', 'done', 'expire') |
| next_time | DATETIME | Task's next time. |
| repeat_period | String | ENUM('none', 'day', 'month', 'year') |

* **Request Example:**

  `[http://localhost:3000/tasks/1`

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| tasks.id | INT | Task's id. |

* **Success Response Example:**

```
{
    "message": "Update task",
    "data": {
        "tasks": {
            "id": 7
        }
    }
}

```

### Personal Tasks Get API

>Authorization

* **End Point:** `/tasks`

* **Method:** `GET`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Query Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| keyword | String | Required |

* **Request Example:**

  `http://localhost:3000/tasks`

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| tasks | Array | Array of `Task Object`. |

* **Success Response Example:**

```
{
    "message": "Search tasks",
    "data": {
        "tasks": [
            {
                "id": 7,
                "user_id": 3,
                "content": "貓咪餵飯",
                "state": "ongoing",
                "created_at": "2024-01-24 14:44:37",
                "expired_at": "2024-02-04 18:30:00",
                "repeat_period": "none",
                "next_time": null
            }
        ]
    }
}
```



### Tasks Search API

>Authorization

* **End Point:** `/tasks/search`

* **Method:** `GET`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Query Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| keyword | String | Required |

* **Request Example:**

  `http://localhost:3000/tasks/search?sort=created_time`
  `http://localhost:3000/tasks/search?sort=expired_time`
  `http://localhost:3000/tasks/search?sort=creator`
  `http://localhost:3000/tasks/search?sort=ID`
  `http://localhost:3000/tasks/search?creator_id=1&&executor_id=2`
  `http://localhost:3000/tasks/search?start_time=2024-12-04 18:30:00&&end_time=2025-12-04 18:30:00`
  `http://localhost:3000/tasks/users/search?sort=expired_time&&creator_id=1`


* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| tasks | Array | Array of `Task Search Object`. |

* **Success Response Example:**

```
{
    "message": "Search tasks",
    "data": {
        "tasks": [
            {
                "id": 7,
                "user_id": 3,
                "content": "貓咪餵飯",
                "state": "ongoing",
                "created_at": "2024-01-24 14:44:37",
                "expired_at": "2024-02-04 18:30:00",
                "repeat_period": "none",
                "next_time": null
            },
            {
                "id": 1,
                "user_id": 1,
                "content": "後端作業",
                "state": "done",
                "created_at": "2024-01-22 03:46:35",
                "expired_at": "2025-11-04 18:30:00",
                "repeat_period": "none",
                "next_time": null
            },
            {
                "id": 2,
                "user_id": 1,
                "content": "前端作業",
                "state": "ongoing",
                "created_at": "2024-01-22 22:47:11",
                "expired_at": "2025-11-04 18:30:00",
                "repeat_period": "none",
                "next_time": null
            }
        ]
    }
}
```

--- 

### Task delete API

>Authorization

* **End Point:** `/tasks/:id`

* **Method:** `DELETE`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Request Example:**

  `http://localhost:3000/tasks/1`


* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| tasks.id | INT | Task's id. |

* **Success Response Example:**

```
{
    "message": "Delete tasks",
    "data": {
        "tasks": {
            "id": 7
        }
    }
}
```
--- 

## Subtask

### Subtask API

>Authorization

* **End Point:** `/subtasks/:task_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |
| Content-Type | String | Only accept `application/json`. |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| content | String | Task's content |
| expired_at | DATETIME | Task's expired time. |
| state | String | ENUM('ongoing', 'done', 'expire') |
| next_time | DATETIME | Task's next time. |
| repeat_period | String | ENUM('none', 'day', 'month', 'year') |

* **Request Body Example:**

```
{
    "task_id": 1,
    "content": "user",
    "state": "done",
    "expired_at": "2025-11-04 18:30:00",
    "repeat_period": "none",
    "next_time": null
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| taskcomment.id | INT | taskcomment's id. |

* **Success Response Example:**

```
{
    "message": "Create subtask",
    "data": {
        "subtask": {
            "id": 2
        }
    }
}
```

### TaskComments Get API

>Authorization

* **End Point:** `/subtasks/:id`

* **Method:** `GET`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Query Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| keyword | String | Required |

* **Request Example:**

  `http://localhost:3000/subtasks/1`

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| tasks | Array | Array of `Subtask Object`. |

* **Success Response Example:**

```
{
    "message": "Get subtasks",
    "data": {
        "subtask": [
            {
                "id": 2,
                "user_id": 3,
                "task_id": 6,
                "content": "user",
                "state": "done",
                "expired_at": "2025-11-04 18:30:00",
                "created_at": "2024-01-24 15:17:45",
                "repeat_period": "none",
                "next_time": null
            }
        ]
    }
}
```

### Subtask Updated API

>Authorization

* **End Point:** `/subtasks/:id`

* **Method:** `PUT`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |
| Content-Type | String | Only accept `application/json`. |

* **Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| id | Number | Subtask's id |


* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| content | String | Task's content |
| expired_at | DATETIME | Task's expired time. |
| state | String | ENUM('ongoing', 'done', 'expire') |
| next_time | DATETIME | Task's next time. |
| repeat_period | String | ENUM('none', 'day', 'month', 'year') |

* **Request Body Example:**

```
{
    "task_id": 1,
    "content": "user",
    "state": "done",
    "expired_at": "2025-11-04 18:30:00",
    "repeat_period": "none",
    "next_time": null
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| subtask | Object | Object of subtask. |

* **Success Response Example:**

```
{
    "message": "Update subtask",
    "data": {
        "subtask": {
            "id": 2,
            "task_id": 1,
            "content": "user",
            "state": "done",
            "expired_at": "2025-11-04 18:30:00",
            "repeat_period": "none",
            "next_time": null
        }
    }
}
```

--- 

## TaskComment

### Task API

>Authorization

* **End Point:** `/taskcomments/:task_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| comment | String | TaskComment's content |

* **Request Body Example:**

```
{
    "comment": "加油！"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| taskcomment.id | INT | taskcomment's id. |

* **Success Response Example:**

```
{
    "message": "Create task comment",
    "data": {
        "taskComment": {
            "id": 9
        }
    }
}
```

### TaskComments Get API

>Authorization

* **End Point:** `/taskcomments/:task_id`

* **Method:** `GET`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Query Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| keyword | String | Required |

* **Request Example:**

  `http://localhost:3000/taskcomments/1`

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| tasks | Array | Array of `Task Object`. |

* **Success Response Example:**

```
{
    "message": "Get task comments",
    "data": {
        "taskComments": [
            {
                "id": 3,
                "user": {
                    "id": 1,
                    "name": "1"
                },
                "comment": "已完成一半",
                "created_at": "2024-01-23 02:11:55"
            },
            {
                "id": 7,
                "user": {
                    "id": 2,
                    "name": "2"
                },
                "comment": "加油！",
                "created_at": "2024-01-23 02:13:25"
            },
            {
                "id": 9,
                "user": {
                    "id": 1,
                    "name": "1"
                },
                "comment": "加油！",
                "created_at": "2024-01-24 01:56:23"
            }
        ]
    }
}
```
--- 

## Group

### Group API

>Authorization

* **End Point:** `/groups`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |
| Content-Type | String | Only accept `application/json`. |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| comment | String | TaskComment's content |

* **Request Body Example:**

```
{
    "name": "小圈圈"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| taskcomment.id | INT | taskcomment's id. |

* **Success Response Example:**

```
{
    "message": "Create group",
    "data": {
        "group": {
            "id": 2
        }
    }
}
```

### Group Follower API

>Authorization

* **End Point:** `/groups/:id/followers/:task_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| id | Number | Group's id |
| task_id | Number | Task's id |

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| followers.id | INT | followers's id. |
| followers.user_id | INT | user's id. |

* **Success Response Example:**

```
{
    "message": "Create group followers",
    "data": {
        "followers": [
            {
                "id": 9,
                "user_id": 3
            }
        ]
    }
}
```

### Group Executors API

>Authorization

* **End Point:** `/groups/:id/executors/:task_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| id | Number | Group's id |
| task_id | Number | Task's id |

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| executors.id | INT | executors's id. |
| executors.user_id | INT | user's id. |

* **Success Response Example:**

```
{
    "message": "Create group executors",
    "data": {
        "executors": [
            {
                "id": 9,
                "user_id": 3
            }
        ]
    }
}
```

--- 

## GroupMember

### GroupMember API

>Authorization

* **End Point:** `/groupmembers/:group_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |
| Content-Type | String | Only accept `application/json`. |

* **Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| id | Number | Group's id |

* **Request Body**

| Field | Type | Description |
| :---: | :---: | :---: |
| identity | String | ENUM('leader', 'member') |

* **Request Body Example:**

```
{
    "identity": "member"
}
```

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| groupmember.id | INT | Groupmember's id. |

* **Success Response Example:**

```
{
    "message": "Create group member",
    "data": {
        "groupmember": {
            "id": 4
        }
    }
}
```
--- 

## Follower

### Follower API

>Authorization

* **End Point:** `/followers/:task_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| task_id | Number | Task's id |

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| follower.id | INT | Follower's id. |

* **Success Response Example:**

```
{
    "message": "Create follower",
    "data": {
        "follower": {
            "id": 15
        }
    }
}
```

### Task delete API

>Authorization

* **End Point:** `/followers/:task_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| task_id | Number | Task's id |

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| follower.id | INT | Follower's id. |

* **Success Response Example:**

```
{
    "message": "Delete follower",
    "data": {
        "follower": {
            "id": 9
        }
    }
}
```

--- 

## Executor

### Executor API

>Authorization

* **End Point:** `/executors/:task_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| task_id | Number | Task's id |

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| executors.id | INT | Executors's id. |

* **Success Response Example:**

```
{
    "message": "Create executor",
    "data": {
        "executor": {
            "id": 10
        }
    }
}
```

### Executor delete API

>Authorization

* **End Point:** `/executors/:task_id`

* **Method:** `POST`

* **Request Headers:**

| Field | Type | Description |
| :---: | :---: | :---: |
| Authorization | String | Access token preceding `Bearer `. For example: `Bearer x48aDD534da8ADSD1XC4SD5S` |

* **Parameters**

| Field | Type | Description |
| :---: | :---: | :--- |
| task_id | Number | Task's id |

* **Success Response: 200**

| Field | Type | Description |
| :---: | :---: | :--- |
| executor.id | INT | Executor's id. |

* **Success Response Example:**

```
{
    "message": "Delete executor",
    "data": {
        "executor": {
            "id": 9
        }
    }
}
```
