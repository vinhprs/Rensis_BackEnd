import { Injectable } from "@nestjs/common";
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from "path";

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
    async createGqlOptions(): Promise<ApolloDriverConfig> {
        return {
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            cors: {
                credentials: true,
                origin: [
                    'http://localhost:3000'
                ],
            },
            context: ({req, res}) => ({req, res}),
            installSubscriptionHandlers: true,
            debug: false
         
        }
    }
        
}