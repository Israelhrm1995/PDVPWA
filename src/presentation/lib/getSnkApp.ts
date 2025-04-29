import { ApplicationContext } from "@sankhyalabs/core";
import type { SnkApplication } from "@sankhyalabs/sankhyablocks/dist/types/components/snk-application/snk-application";

const getSnkApp = () : SnkApplication => ApplicationContext.getContextValue("__SNK__APPLICATION__");

export default getSnkApp;