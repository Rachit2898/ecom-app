module.exports = ({ config }) => {
  if (process.env.APP_ENV === "production") {
    const appConfig = {
      ...config,
      extra: {
        fact: "production",
        eas: {
          projectId: "30f26717-38f8-4eef-8ef0-7868b87459f4",
        },
      },
    };
    return appConfig;
  } else {
    const appConfig = {
      ...config,
      extra: {
        fact: "staging",
        eas: {
          projectId: "30f26717-38f8-4eef-8ef0-7868b87459f4",
        },
      },
    };
    return appConfig;
  }
};
