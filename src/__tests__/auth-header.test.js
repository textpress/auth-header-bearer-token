// @flow
"use strict";

import authHeader from "..";
import jsonWebToken from "jsonwebtoken";
import MockReq from "mock-req";
import MockRes from "mock-res";

const token = jsonWebToken.sign( { foo: "bar" }, "shhhhh" );
const headers = {
    "Authorization": `Bearer ${token}`
};


describe( "jwt-token/headers", () => {

    describe( "extractToken", () => {

        it( "works", () => {
            const req = new MockReq( { headers: { ...headers } } );
            expect( authHeader.extractToken( req.headers ) ).toEqual( token );
        } );

        it( "returns null if there is no header", () => {
            const req = new MockReq( { headers: {} } );
            expect( authHeader.extractToken( req.headers ) ).toEqual( null );
        } );

        it( "returns null if the header is in incorrect format", () => {
            const req = new MockReq( { headers: { "Authorization": token } } );
            expect( authHeader.extractToken( req.headers ) ).toEqual( null );
        } );

        it( "accepts null", () => {
            expect( authHeader.extractToken( null ) ).toEqual( null );
        } );

    } );


    describe( "setToken", () => {

        it( "works", () => {
            const res = new MockRes();
            authHeader.setToken( res.getHeaders(), token );
            expect( res.getHeader( "Authorization" ) ).toEqual( headers.Authorization );
        } );

        it( "ignores empty token", () => {
            const res = new MockRes();
            authHeader.setToken( res.getHeaders(), ( null: any ) );
            expect( res.getHeader( "Authorization" ) ).toEqual( undefined );

            authHeader.setToken( res.getHeaders(), "" );
            expect( res.getHeader( "Authorization" ) ).toEqual( undefined );
        } );

    } );

} );
