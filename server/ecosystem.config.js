module.exports = {
    apps: [
      {
        name: "intel-gpt",
        script: "./index.js",
        instances: "max", // Use all CPU cores
        exec_mode: "cluster", // Enables cluster mode for better performance
        watch: true, // Restart on file changes
        ignore_watch:"node_modules",
        time:true,
        max_memory_restart: "500M", // Auto-restart if memory exceeds 500MB
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        }
      }
    ]
  };
  