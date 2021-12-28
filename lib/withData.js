import {ApolloClient , ApolloLink , InMemoryCache} from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/react-ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint , prodEndpoint } from '../config';
import paginationField from './paginationField';

//console.log("Endpoint: " + `http://localhost:3000/api/graphql`)
function createClient({ headers , initialState }){
    return new ApolloClient({
        link: ApolloLink.from([
            onError(({graphQLErrors , networkError}) => {
                if(graphQLErrors)
                graphQLErrors.forEach(({ message , locations , path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location:${locations}, Path:${path}`
                    )
                 );

            if(networkError) 
            console.log(
                `[Network Error]:${networkError}. Backend is unreachable. Is it running?`
            );

            }),

            createUploadLink({
                uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
                fetchOptions: {
                    credentials:'include',
                }
                ,
                 headers,
            }),
        ]),
        cache: new InMemoryCache({  
            typePolicies: {                
                Query : {
                    fields:{                       
                        //TODO: We will add this together.                        
                        allProducts123: paginationField()
                    },
                },
                //link,
            },
        }).restore(initialState || {}),
         
    });
  
}

export default withApollo(createClient, { getDataFromTree});