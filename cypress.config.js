const { defineConfig } = require('cypress')
const xlsx = require("node-xlsx").default;
const fs = require("fs");
const { verifyDownloadTasks } = require('cy-verify-downloads');
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');
const mysql = require("mysql")

module.exports = defineConfig({
  // chromeWebSecurity: false,
  watchForFileChanges: false,
  retries: {
    runMode: 2
  },
  "env": {
    "db": {
      server: "127.0.0.1",
      user: "root",
      password: "12345678",
      database: "ac"
    }
  },
  e2e: {
    defaultCommandTimeout: 6000,
    setupNodeEvents(on, config) {
      // return require('./cypress/plugins/index.js')(on, config)
      require('cypress-terminal-report/src/installLogsPrinter')(on, {
        printLogsToConsole: "always",
      });
      on("task", {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        
        }
      });
      on('task', verifyDownloadTasks);
      on('task', {downloadFile});
      on("task", { deleteFileTask(fileName) {
        return new Promise((resolve, reject) => {
          fs.rm(fileName, {maxRetries: 10, recursive: true}, (err) => {
            if (err) {
              console.error(err)
              return reject(err)
            }
            resolve(null)
          })
        })
      }})
      on("task", { deleteFolderTask(folderName) {
        return new Promise((resolve, reject) => {
          fs.rmdir(folderName, {maxRetries: 10, recursive: true}, (err) => {
            if (err) {
              console.error(err)
              return reject(err)
            }
            resolve(null)
          })
        })
      }})
      on("task", {
        queryDb: (query) => {
          return queryOnDatabase (query, config)
        }
      })
    },
  },
})

function queryOnDatabase(query, config) {
	const connection = mysql.createConnection(config.env.db)
	connection.connect()
	return new Promise((resolve, reject) => {
		connection.query(query, (error, results) => {
			if (error) reject(error)
			else {
				connection.end()
				console.log(results)
				return resolve(results)
			}
		})
	})
}
