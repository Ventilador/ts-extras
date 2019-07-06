import { LanguageService } from "typescript/lib/tsserverlibrary";
import { MethodMetadata } from "@ts-extras/serialization";

export function callLanguageService(
    langService: LanguageService
    , methods: Record<string, MethodMetadata>
    , action: string
    , write: (chunk: Buffer) => void) {

}