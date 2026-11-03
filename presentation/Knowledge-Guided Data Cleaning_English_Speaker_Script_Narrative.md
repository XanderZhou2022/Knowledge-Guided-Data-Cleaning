# Knowledge-Guided Data Cleaning
## From Knowledge Acquisition to Reliable Decisions

**English speaker script · 52 slides**


## Slide 01 · Title

Hello everyone. Today, I'll discuss how knowledge helps us make reliable data cleaning decisions, and how this connects to the broader task of data preparation.

## Slide 02 · The path through the survey

We'll follow the decisions involved: where knowledge comes from, how it guides repairs, and how we judge the results. Let's begin with a simple request.

## Slide 03 · A simple request

Imagine you're the analyst, and your manager asks, “Can you show me last year's actual sales by month and city?” You expect to open the orders table and calculate the totals.

## Slide 04 · The data behind the request

Then you open the data. The same order for 120 appears twice. New York is misspelled, and a customer's ZIP code points to a different city. There is even an order with two customers mixed together. Which records can you trust?

## Slide 05 · Evidence for a change

Look at this order. The ZIP code points to New York, but the city says Boston. We can see a mismatch. **What tells us which value is wrong, and what should replace it?**

## Slide 06 · How would a computer know?

For us, the mismatch may seem obvious. But a computer only sees a ZIP code and a city name. It needs the relationship between them before it can flag this order.

## Slide 07 · Provide the rules in advance

The simplest option is to give it the rules in advance.

*Change slides immediately. The next example completes this thought.*

## Slide 08 · Rules with conditions · CFD [1]

In these UK records, the same postcode appears with both High Street and King Street. Under this rule, that's a conflict. The US row stays outside the check because the rule only applies to UK records.

## Slide 09 · A shared rule interface · NADEEF [7]

With many rule types, checking each one separately becomes difficult. A shared interface lets different rules feed into the same detection and repair process. This makes them easier to use together.

## Slide 10 · One conflict, several possible repairs

Yet the conflict remains ambiguous. We could change the city to New York, or change the ZIP code to match Boston. Both remove the conflict. Choosing between them requires more evidence.

*Pause briefly over the two alternatives.*

## Slide 11 · Trusted matching attributes · Certain Fixes [2]

Suppose we've checked that the customer ID is correct. The trusted record for that customer says New York. Now we have evidence for changing Boston to New York in the order.

## Slide 12 · External facts · KATARA [8]

Or suppose a table lists Madrid as Italy's capital. Once we recognize the country and capital columns, we can check that claim against a knowledge base, which points to Rome. People verify cases the knowledge base cannot settle.

## Slide 13 · The cost of acquiring knowledge

Rules and references help, but someone must build and maintain them. **As the data grows, can the system acquire useful knowledge with less manual effort?**

## Slide 14 · Learning rules at scale · Parallel Rule Discovery [9]

The ZIP–city pairs here give us a starting point. We can mine candidate rules from smaller samples in parallel, combine them, and check which relationships hold. That reduces the search needed on a large table.

## Slide 15 · Learning temporal relationships · TSDDiscover [10]

For time series, those relationships must allow for delays and normal variation. Here, learning both the relationship between signals and its error bound helps distinguish ordinary movement from an unusual spike.

## Slide 16 · Learning through generation · Garf [4]

Here, the generator tries to complete a record's missing state. A discriminator compares generated records with real ones, and its feedback helps the generator learn relationships between fields. These become repair rules, with rules and data then checked together.

## Slide 17 · Reusing knowledge from other tables · Auto-Test [11]

After learning from city columns containing Rome, Paris, and Boston, the system can test a new column. It first checks that the column really represents cities. Paris passes, but a five-digit number gets flagged.

## Slide 18 · When frequent values are wrong

But look at these city names: the same spelling mistake appears four times, while the correct spelling appears once. If we simply choose the most frequent value, we would reinforce the error.

## Slide 19 · Learning from limited feedback · Raha [5]

We can ask a person to help, without making them inspect every cell. Grouping cells with similar detector signals lets a few labels guide predictions for the rest. **We now have evidence for finding errors. Next comes deciding how to fix them.**

## Slide 20 · Turning knowledge into a repair

For a suspicious city name, what turns the available evidence into a specific correction?

## Slide 21 · Graph context and feedback · GIDCL [15]

For the city with a missing letter here, a few labels help a language model propose error patterns. Feedback tests those patterns, and clean neighboring records in the graph help the model choose the correction.

## Slide 22 · Generating and ranking alternatives · Baran [6]

An address like “9th Str” gives us another route. Past edits suggest “Street,” while the row and other addresses provide context. These clues generate possible repairs, and user examples help rank them, even if the complete answer is absent from the table.

## Slide 23 · Understanding string meaning · DataVinci [12]

In “blue phone 3,” “blue” is a color and “3” is a number. The other entries follow that pattern too, but “phone” doesn't fit. That meaning supports an edit program that removes the extra word.

## Slide 24 · When evidence disagrees

But candidates can have competing support. Here, the ZIP rule points to New York, while past orders point to Boston. We need a way to combine the evidence.

## Slide 25 · Combining signals probabilistically · HoloClean [3]

For this misspelled Chicago entry, the ZIP rule, address dictionary, and patterns in the data all provide clues. A probabilistic model combines these signals and considers related cells together when selecting the repair.

## Slide 26 · Connecting predictions to rules · Rock [14]

We can also connect a model's judgment to a rule. These two records describe the same iPhone, but one has an incomplete maker name. Once we establish the product match, the same-maker rule lets us use the verified name, Apple, to correct the other record.

## Slide 27 · Repairing mixed identities · Splitting Tuples [16]

Now imagine two directors with the same name have been merged into one row. One is Swiss, the other German. Supporting facts help assign the film and personal details to the right person, so we need to split the row.

## Slide 28 · Repairing statistical relationships · OTClean [17]

Some problems only appear across many records. In this plot, two variables remain associated within a group where we require independence. Optimal transport adjusts the distribution while controlling change costs. **Across these repair types, how do we check that the changes are reliable?**

## Slide 29 · Damage caused by a repair

Imagine returning to our manager with this report. A mistaken repair changed a correct 120 to 720, turning actual sales of 200 into reported sales of 800. The repair itself has now distorted the answer.

## Slide 30 · Diagnosing the likely error · Minimum Change ≠ Best Cleaning [19]

This flight appears twice, with its arrival time written in two different formats. Before changing anything, we should diagnose which entry is likely wrong, using formatting clues and probabilities based on the surrounding data.

## Slide 31 · Checking the constraint itself · bNDCRepair [18]

But the rule itself may be inaccurate. Suppose a sensor reports 102, just outside the allowed range of 99 to 101. Should we change the reading or widen the range? Clean validation data helps evaluate both choices and their costs.

## Slide 32 · Hard limits and soft trends · SHoTClean [20]

Watch the spike in this series. It stays within the speed limit, yet breaks the surrounding trend. Hard boundaries identify feasible paths, while soft trends help select a more plausible one.

## Slide 33 · Deciding when to abstain · Auto-Fill [13]

For this iPhone, “Apple” looks like an easy brand to fill in. But less familiar products may leave the specialist models uncertain. Calibrated confidence scores help decide when to accept a prediction and when to keep the value missing.

## Slide 34 · Spending the cleaning budget · ActiveClean [21]

There is also a question of priority. In this drug dataset, we clean a selected batch of names, then update the classifier. Repeating this process with records likely to affect the model directs limited cleaning effort toward the modeling task.

## Slide 35 · Choosing a cleaning pipeline · SAGA [22]

At the pipeline level, should we fill missing values before scaling, or after? Downstream validation helps choose the order and settings. Factual accuracy, rule consistency, and task performance remain distinct goals. **Now, would clean values alone complete our manager's request?**

## Slide 36 · Beyond repairing values

We still need to turn those values into a usable report. That broader preparation task requires understanding the request and coordinating the steps needed to produce the result.

## Slide 37 · What does “actual sales” mean?

For example, should cancelled orders count? How should refunds be deducted? The answers define “actual sales,” so business context or user confirmation must guide the calculation.

## Slide 38 · Making suggestions inspectable · CoWrangler [27]

This emergency-call column packs an address, a station, and a date into one cell. A suggested split shows them as separate columns, along with the code. The user can inspect that preview before accepting or adjusting the operation.

## Slide 39 · Clarifying a transformation request · MegaTran [28]

The user might instead say, “Convert these dates,” when the column contains Excel serial numbers. A small model makes the date convention and output format explicit, then a stronger model generates and checks code that can handle new rows.

## Slide 40 · Evaluating preparation capabilities · PrepBench [30]

Asking whether to subtract refunds is one ability. Producing the correct sales table is another. Evaluation separates clarification, code generation, and workflow translation, then checks executable outputs against the expected result tables.

## Slide 41 · A larger data environment

Understanding the request is one part of the task. In an enterprise, orders and refunds may live in different systems. We also need to find those sources and understand how they connect.

## Slide 42 · Understanding private meanings · Enterprise Data Engineering [23]

Field names alone may reveal very little. What does status “C” mean? Which amount includes refunds? Research on enterprise tasks shows why internal meanings and private context matter for these decisions.

## Slide 43 · Finding relevant tables · Pneuma [24]

That context also helps us find tables. Suppose we want revenue after the phone launch. The table shows sales by year, but the catalog tells us the launch was in 2021. Searching both connects the question to relevant data.

## Slide 44 · Choosing the operation order

Once we find the tables, order matters. This order has refunds of 10 and 15. Joining both rows directly would repeat the order amount. We first combine them into one refund total of 25, then join that result to the order.

*Let the audience look at the two refund rows before moving on.*

## Slide 45 · Restructuring an irregular table · Auto-Tables [25]

We may also need to change a table's shape. The dates here are column headers, with sales beneath them. The system generates and ranks programs that move those dates into a Date column, even without an example of the desired output.

## Slide 46 · Restructuring for the next operation · Auto-Prep [26]

That reshaping can unlock the next step. The fertility table stores years as headers, while the date table stores years as values. Turning the headers into a Year column makes the join possible, so both choices matter together.

## Slide 47 · Revisiting an earlier choice · DeepPrep [29]

Now imagine the agent deletes this ratings column, then a later step fails because it needs those values. Keeping earlier states lets it go back, preserve the column, and split the score from the year. **Could that verified experience also help with the next task?**

## Slide 48 · Learning across tasks

This leads to our future direction: agents that retain verified knowledge from preparation tasks. What they learn about rules, field meanings, and useful operations could support later decisions.

## Slide 49 · Managing accumulated knowledge

A saved refund rule should record where it came from and when it applies. If the business changes its reporting policy, the agent should update or retire that rule. Missing evidence should prompt data inspection, document retrieval, or a question to the user.

## Slide 50 · Reuse and verification

Confirmed meanings and relationships could carry from cleaning into transformation and analysis. They could also check intermediate results, such as repeated amounts after a join. **The goal is to use knowledge for today's decisions, and retain verified experience for tomorrow's tasks.**

## Slide 51 · References

The thirty studies are listed here, with the full materials available through the presentation link.

*Briefly show the references, then move to the closing slide.*

## Slide 52 · Thank you

Thank you for listening. I look forward to your questions.
