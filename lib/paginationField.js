import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
    return {
        keyArgs: false, // tells apollo we will take care of everything
        read(existing =[] , { args , cache }){
            console.log({existing , args , cache});
            const { skip , first} = args;

            //Read the no of items on the page from cache
            const data  = cache.readQuery({query: PAGINATION_QUERY });
            //console.log(data);
            const count = data?.productsCount;
            console.log("COUNT: " + count);
            const page = skip / first + 1;
            const pages = Math.ceil(count / first);
            console.log("Pages:" + pages);

            //Check if we have existing items
            const items = existing.slice(skip , skip + first).filter((x) => x);
            console.log("Total items : " + items);

            //If there are items and there are not enough items to satify how many were 
            //requested (i.e value of perPage) and we are on the last page then 
            //just send 

            if(items.length && items.length !== first && page === pages){
                return items
            }            
            if(items.length !== first){
                //We dont have any items, we must go the network to fetch them
                return false;
            }

            //If there are items, just return them from cache and we dont need to go the network
            if(items.length){
                console.log(`There are ${items.length} items in the cache! Going to send them to Apollo`);
                return items;
            }

            return false; //fallback to network

            //first thing it does it asks the read function for those items

            //We can either do two things:

            // First, return the items as they are already in the cache.

            //The other thing is we can return false from here , (i.e make a netwrok request)
        },

        merge(existing , incoming , { args }) {
            const {skip , first } = {args};
            //This runs when the Apollo client comes back for the network with our request
            console.log(`Merging items for the network ${incoming.length}`);
            const merged = existing ? existing.slice(0) : [];                
            for(let i = skip; i < skip + incoming.length; i++ ){
                merged[i] = incoming[i - skip];
            }

            console.log("Merged:  " + merged);

            //Finally we return the merged items from the cache.
            return merged;
        },

    };
}