export type UserTokenPayload = {
    id: string;
    organisationName: string;
};

export type ExtractedDocument = {
    heading : string;
    url: string;
    link: string;
    body: string;
}