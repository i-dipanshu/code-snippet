/* This code will handle all the error in a async function calls */
export default (handleAsyncError) => (req, res, next) => {
    Promise.resolve(handleAsyncError(req, res, next)).catch(next);
}