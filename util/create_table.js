const mysql = require('mysql2');

// 創建數據庫連接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ycsql0330_',
  database: 'todolist'
});

// 連接數據庫
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }

  console.log('Connected to database');

  // 定義 SQL 資料庫建表語句
  const sqlStatements = [
    `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS tasks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        state ENUM('ongoing', 'done', 'expire') NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        expired_at DATETIME,
        repeat_period ENUM('none', 'day', 'month', 'year') NOT NULL,
        next_time DATETIME,
        CONSTRAINT tasks_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS subtasks (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        task_id INT NOT NULL,
        content TEXT NOT NULL,
        state ENUM('ongoing', 'done', 'expire') NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        expired_at DATETIME,
        repeat_period ENUM('none', 'day', 'month', 'year') NOT NULL,
        next_time DATETIME,
        CONSTRAINT subtasks_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT subtasks_task_id_fk FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS task_comments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        task_id INT NOT NULL,
        comment TEXT NOT NULL, 
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT task_comments_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT task_comments_task_id_fk FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS executors (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        task_id INT NOT NULL,
        CONSTRAINT executors_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT executors_task_id_fk FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        UNIQUE INDEX unique_task_executor (user_id, task_id)
    );`,
    `CREATE TABLE IF NOT EXISTS followers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        task_id INT NOT NULL,
        CONSTRAINT followers_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT followers_task_id_fk FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
        UNIQUE INDEX unique_task_follower (user_id, task_id)
    );`,
    `CREATE TABLE IF NOT EXISTS groups_table (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        CONSTRAINT groups_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS group_members (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        group_id INT NOT NULL,
        identity ENUM('leader', 'member') NOT NULL,
        CONSTRAINT group_members_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT group_members_group_id_fk FOREIGN KEY (group_id) REFERENCES groups_table(id) ON DELETE CASCADE,
        UNIQUE INDEX unique_group_user (group_id, user_id)
    );`
  ];

  // 遍歷所有 SQL 語句並執行
  sqlStatements.forEach((sql) => {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.error('Error executing SQL statement: ', error);
      } else {
        console.log('SQL statement executed successfully');
      }
    });
  });

  // 關閉數據庫連接
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection: ', err);
    } else {
      console.log('Database connection closed');
    }
  });
});
