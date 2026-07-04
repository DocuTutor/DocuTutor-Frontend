interface LangflowRunResponse {
  outputs: {
    outputs: {
      results: {
        message: {
          text: string;
        };
      };
    }[];
  }[];
}