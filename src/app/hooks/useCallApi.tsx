import React, { use, useEffect, useState } from "react";

interface IGetItems {
  page?: number;
  pageSize?: number;
  name?: string;
  category?: string;
  creatorId?: string;
}
interface IApiFunc<T> {
  params?: IGetItems;
  body?: T;
}

function useCallApi(
  apiFunc: (options: IApiFunc<T>) => Promise<ApiResponse<T>>,
  params: IGetItems,
  body: T
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<T>();
  const [err, setErr] = useState();

  useEffect(() => {
    apiFunc(params);
  }, []);
  return <div>useCallApi</div>;
}

export default useCallApi;
