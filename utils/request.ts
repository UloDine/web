export async function POST<T>(payload: any, endpoint: string) {
  try {
    const response: Response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(JSON.stringify(error));
    }
    const data: T = await response.json();
    return data;
  } catch (err: any) {
    return {
      status: "fail",
      message: JSON.parse(err.message).message,
    };
  }
}
