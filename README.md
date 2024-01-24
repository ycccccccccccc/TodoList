# TodoList

## 🚀 How to reproduce the project?
1. Download TodoList from https://github.com/ycccccccccccc/TodoList
2. Configure the `.env` parameters: `SECRET` for JWT, `DB_password`, and `DB_host` for MySQL.
3. Uuder TodoList file, Run `docker-compose up --build`.
6. Congratulations! You can test it using Postman at `http://localhost:3000/`.

[API design](https://github.com/ycccccccccccc/TodoList/blob/main/API_Doc.md)

## 訊息提醒任務即將到期
使用 node-cron 套件，設定在每天的午夜時分，將隔天到期的 Task ，新增 Event 給有 Task 的相關人員(creator, followers, executors)

```
cron.schedule('0 0 * * *', () => {

  const tasksExpired = await getTasksExpire(); // 找到要到期的 tasks

  for(const task of tasksExpired){
    cosnt eventID = await createEvent(user_id, task_id); // 發送 event 給相關人員
  }
}
```

## 定時重複任務
使用 node-cron 套件，設定在每天的午夜時分，將 next_time 在隔天的 Task，拷貝一個內容一樣的 Task，但 next_time 的內容則改為 next_time + 一個週期
```
cron.schedule('0 0 * * *', () => {

  const tasksRepeated = await getTasksRepeated(); // 找到重複週期為隔天的 tasks

  for(const task of tasksRepeated){
    task['next_time'] = task['next_time'] + repeat_period; 
    cosnt taskID = await createTask(user_id, content, state, expired_at, repeat_period, next_time); // 建立新的 task
  }
}
```
