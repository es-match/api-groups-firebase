# api-groups-firebase

API Criada para uso dentro do aplicativo Easy Sport Match, desenvolvido durante especializaçao em Engenharia de Software EES UFSCAR


Requests disponível



# GET /groups/byID/:id

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| id            | string        | sim          |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| groupName     | string        |

---

# GET /groups/byUser/:userID

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| userid      | string              | sim        |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| listgroups     | List<string> |

---


# GET /groups/byName/:groupName

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| groupName      | string              | sim        |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| listgroups     | List<Map<string,string>> |

---

# GET /groups

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
|       |               |         |


## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
| listgroups     | List<string> |

---

# POST /groups

## Request
| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| groupName      | string              | sim   |
| groupDescription      | string              | sim   |
| groupAdmins      | string              | sim   |
| groupUsers      | string              | sim   |
| imageUrl      | string              | sim   |
| activityID      | string              | sim   |
| userCreator      | string              | sim   |

## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
|  id     | string               |        
| groupName      | string              |
| groupDescription      |string|
| groupAdmins      | string| 
| groupUsers      | string| 
| imageUrl      | string| 
| activityID      | string|
| userCreator      | string|

---

# PATCH /groups

| Parâmetros    | Tipo          | Obrigatório  |
| ------------- |---------------| -------------|
| id      | string              | sim   |
| groupName      | string              | sim   |
| groupDescription      | string              | sim   |
| groupAdmins      | string              | sim   |
| groupUsers      | string              | sim   |
| imageUrl      | string              | sim   |
| activityID      | string              | sim   |
| userCreator      | string              | sim   |

## Response
| Parâmetros    | Tipo          |
| ------------- |---------------|
|  id     | string               |        
| groupName      | string              |
| groupDescription      |string|
| groupAdmins      | string| 
| groupUsers      | string| 
| imageUrl      | string| 
| activityID      | string|
| userCreator      | string|
