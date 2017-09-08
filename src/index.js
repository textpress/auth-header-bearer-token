//@flow

type Headers = { [string]: string };


export function setToken( headers: Headers, token: string ) {
    if ( token )
        headers[ "authorization" ] = `Bearer ${token}`;
}


export function extractToken( headers: ?Headers ): ?string {
    const header = ( headers || {} )[ "authorization" ];
    if ( !header )
        return null;
    const match = header.match( /^Bearer (.+)$/ );
    return match ? match[ 1 ] : null;
}


export default { setToken, extractToken };
