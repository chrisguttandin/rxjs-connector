import { TStringifyableJsonObject } from 'rxjs-broker';
import { TCandidateMessage } from './candidate-message';

export type TCandidateEvent = TStringifyableJsonObject<{

    message: TCandidateMessage;

    type: 'candidate';

}>;
