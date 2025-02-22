/**
 * PageTitle.jsx
 * 
 * @author By: jli48 rlee19 - JumboHack Spring 2025
 * @description A simple header component used to render a 
 * large title at the top of a page. 
 */


export default function PageTitle({ contents }) {

        /**
         * The <h1> tag creates a large header on a page
         * 
         * The className property allows us to add some stylistic effects 
         * to the header. `text-center` centers the text horizontally,
         * `text-4xl` increases the font size of the header to `4xl`, 
         * `my-4` adds some spacing above and below the header.
         */
        return (
          <>
            <h1 className="text-center text-4xl font-bold my-4">{contents}</h1>
          </>
        )
      }