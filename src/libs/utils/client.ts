import useSWR, { mutate } from 'swr';
export type QueryHelperResolvers = {
    onCompleted?: (data: any) => void;
    onError?: (err: any) => void;
};
export const get = async (url: string, queryHelpers?: QueryHelperResolvers) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        queryHelpers?.onCompleted?.(data);
        return data;
    } catch (error) {
        queryHelpers?.onError?.(error);
        throw error;
    }
};
export function useQuery(url: string, queryHelpers?: QueryHelperResolvers) {
    const {
        data,
        error,
        isValidating: isLoading,
    } = useSWR(url, get, { onSuccess: queryHelpers?.onCompleted, onError: queryHelpers?.onError });
    return {
        data,
        error,
        isLoading,
    };
}
export const post = async (url: string, data: any) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = new Error('An error occurred while fetching the data.') as Error & {
                info: any;
                status: number;
            };
            error.info = await response.json();
            error.status = response.status;
            throw error;
        }

        return response.json();
    } catch (error) {
        console.error(`Error in post request to ${url}:`, error);
        throw error;
    }
};

interface PostData {
    [key: string]: any;
}
export type MutationHelperResolvers = {
    initialData?: any;
    onCompleted?: (data: any) => void;
    onError?: (err: any) => void;
};
export function useMutation(
    url: string,
    queryHelpers?: MutationHelperResolvers,
): [
    (data: PostData) => Promise<any>,
    {
        data: any;
        error: any;
        isLoading: boolean;
    },
] {
    const { data, error, isValidating } = useSWR(url, { fallbackData: queryHelpers?.initialData });

    const postData = async (data: PostData) => {
        try {
            const response = await post(url, data);
            mutate(url, response, false);
            queryHelpers?.onCompleted?.(response);
            return response;
        } catch (error) {
            queryHelpers?.onError?.(error);
            console.error(`Error in mutation with url ${url} and data:`, data, error);
            throw error;
        }
    };

    return [
        postData,
        {
            data,
            error,
            isLoading: isValidating,
        },
    ];
}
